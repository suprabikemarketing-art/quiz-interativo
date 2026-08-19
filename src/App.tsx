import { useState, useEffect } from 'react';
import { QUIZ_QUESTIONS } from './data/questions';
import type { QuizAnswer, Option, LeadFormData, QuizLeadPayload } from './types/quiz';
import { saveLeadToGoogleSheet } from './utils/sheetClient';

import { Header } from './components/Header';
import { ProgressBar } from './components/ProgressBar';
import { WelcomeScreen } from './components/WelcomeScreen';
import { QuestionCard } from './components/QuestionCard';
import { ContentTrackModal } from './components/ContentTrackModal';
import { ContactForm } from './components/ContactForm';
import { ResultScreen } from './components/ResultScreen';

type AppStep = 'welcome' | 'quiz' | 'content_track' | 'contact' | 'result';

export function App() {
  const [currentStep, setCurrentStep] = useState<AppStep>('welcome');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, QuizAnswer>>({});
  const [leadData, setLeadData] = useState<LeadFormData | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const isCompleted = localStorage.getItem('supra_quiz_completed') === 'true';
    if (isCompleted) {
      try {
        const savedLead = localStorage.getItem('supra_quiz_lead_data');
        if (savedLead) {
          setLeadData(JSON.parse(savedLead));
        }
      } catch (e) {
        console.warn("Aviso ao ler lead do localStorage:", e);
      }
      setCurrentStep('result');
    }
  }, []);

  const totalQuestions = QUIZ_QUESTIONS.length;
  const currentQuestion = QUIZ_QUESTIONS[questionIndex];

  const handleStart = () => {
    setQuestionIndex(0);
    setAnswers({});
    setCurrentStep('quiz');
  };

  const handleSelectOption = (option: Option) => {
    const questionId = currentQuestion.id;

    const newAnswers = {
      ...answers,
      [questionId]: {
        questionId,
        optionId: option.id,
        optionLabel: option.label,
        points: option.points,
        deviatesToContentTrack: option.deviatesToContentTrack
      }
    };
    setAnswers(newAnswers);

    if (option.requiresTextInput) {
      return;
    }

    if (option.deviatesToContentTrack) {
      setTimeout(() => {
        setCurrentStep('content_track');
      }, 250);
      return;
    }

    setTimeout(() => {
      if (questionIndex < totalQuestions - 1) {
        setQuestionIndex(prev => prev + 1);
      } else {
        setCurrentStep('contact');
      }
    }, 250);
  };

  const handleNextStep = () => {
    const selected = answers[currentQuestion.id];
    if (!selected) return;

    if (selected.deviatesToContentTrack) {
      setCurrentStep('content_track');
      return;
    }

    if (questionIndex < totalQuestions - 1) {
      setQuestionIndex(prev => prev + 1);
    } else {
      setCurrentStep('contact');
    }
  };

  const handleBack = () => {
    if (currentStep === 'quiz') {
      if (questionIndex > 0) {
        setQuestionIndex(prev => prev - 1);
      } else {
        setCurrentStep('welcome');
      }
    } else if (currentStep === 'contact' || currentStep === 'content_track') {
      setCurrentStep('quiz');
    }
  };

  const handleContactSubmit = async (formData: LeadFormData) => {
    setLeadData(formData);
    setIsSaving(true);

    const payload: QuizLeadPayload = {
      nome: formData.nome,
      whatsapp: formData.whatsapp,
      email: formData.email,
      horario_contato: formData.horario_contato,
      possui_socio: formData.possui_socio,
      p1_intencao: answers[1]?.optionLabel || '',
      p2_capital: answers[2]?.optionLabel || '',
      p3_origem_capital: answers[3]?.optionLabel || '',
      p4_regiao: answers[4]?.optionLabel || '',
      p5_experiencia_negocios: answers[5]?.optionLabel || '',
      p6_experiencia_setor: answers[6]?.optionLabel || '',
      p7_prazo: answers[7]?.optionLabel || ''
    };

    await saveLeadToGoogleSheet(payload);

    try {
      localStorage.setItem('supra_quiz_completed', 'true');
      localStorage.setItem('supra_quiz_lead_data', JSON.stringify(formData));
    } catch (e) {
      console.warn("Aviso ao salvar flag concluída:", e);
    }

    setIsSaving(false);
    setCurrentStep('result');
  };

  const handleRestart = () => {
    setQuestionIndex(0);
    setAnswers({});
    setLeadData(null);
    setCurrentStep('welcome');
  };

  return (
    <div className="app-container">
      <Header 
        showBack={currentStep !== 'welcome' && currentStep !== 'result'}
        onBack={handleBack}
      />

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {currentStep === 'welcome' && (
          <WelcomeScreen onStart={handleStart} />
        )}

        {currentStep === 'quiz' && (
          <>
            <ProgressBar 
              currentStep={questionIndex + 1} 
              totalSteps={totalQuestions} 
            />
            <QuestionCard 
              question={currentQuestion}
              selectedOptionId={answers[currentQuestion.id]?.optionId}
              onSelectOption={handleSelectOption}
              onNextStep={handleNextStep}
            />
          </>
        )}

        {currentStep === 'content_track' && (
          <ContentTrackModal onRestart={handleRestart} />
        )}

        {currentStep === 'contact' && (
          <ContactForm 
            onSubmit={handleContactSubmit}
            isLoading={isSaving}
          />
        )}

        {currentStep === 'result' && leadData && (
          <ResultScreen 
            leadData={leadData}
          />
        )}
      </main>

      <footer style={{ 
        textAlign: 'center', 
        marginTop: '24px', 
        fontSize: '0.78rem', 
        color: '#94A3B8',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px'
      }}>
        <span>Supra Bike © 2026</span>
        <span style={{ fontSize: '0.72rem', color: '#64748B' }}>
          Criado por{' '}
          <a 
            href="https://www.instagram.com/wisionarium" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#1E3A8A', textDecoration: 'none', fontWeight: 600 }}
          >
            Wisionarium
          </a>
        </span>
        {currentStep === 'result' && (
          <button
            onClick={() => {
              localStorage.removeItem('supra_quiz_completed');
              localStorage.removeItem('supra_quiz_lead_data');
              localStorage.removeItem('supra_quiz_leads_mock');
              window.location.reload();
            }}
            style={{
              background: 'none',
              border: 'none',
              color: '#CBD5E1',
              fontSize: '0.65rem',
              cursor: 'pointer',
              marginTop: '4px',
              padding: '2px 6px'
            }}
          >
            Limpar dados do site
          </button>
        )}
      </footer>
    </div>
  );
}

export default App;
