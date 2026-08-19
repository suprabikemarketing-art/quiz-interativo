import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, Clock } from 'lucide-react';
import type { LeadFormData } from '../types/quiz';

interface ResultScreenProps {
  leadData: LeadFormData;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  leadData
}) => {
  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.5 },
        colors: ['#1E3A8A', '#2563EB', '#16A34A', '#FFFFFF']
      });
    } catch (e) {
      console.log("Confetti fallback:", e);
    }
  }, []);

  return (
    <div className="quiz-card" style={{ 
      textAlign: 'center', 
      padding: '36px 24px', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center' 
    }}>
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '72px',
        height: '72px',
        borderRadius: '50%',
        background: '#DCFCE7',
        color: '#16A34A',
        marginBottom: '20px'
      }}>
        <CheckCircle2 size={44} strokeWidth={2.2} />
      </div>

      <h1 style={{ 
        fontSize: 'clamp(1.4rem, 4.5vw, 1.8rem)', 
        color: '#0F172A', 
        marginBottom: '10px',
        fontFamily: 'var(--font-heading)',
        fontWeight: 800,
        textAlign: 'center'
      }}>
        Inscrição Concluída com Sucesso!
      </h1>

      <p style={{ 
        color: '#1E3A8A', 
        fontWeight: 700, 
        fontSize: '1rem', 
        marginBottom: '16px',
        textAlign: 'center'
      }}>
        Seu perfil foi recebido com sucesso.
      </p>

      <p style={{ 
        color: '#475569', 
        fontSize: '0.95rem', 
        marginBottom: '28px', 
        lineHeight: 1.6,
        textAlign: 'center',
        maxWidth: '480px'
      }}>
        Nossa equipe de expansão vai analisar suas respostas e entrar em contato via WhatsApp em até 48 horas úteis.
      </p>

      {/* Status Box - 100% Centralizada */}
      <div style={{
        background: '#EFF6FF',
        border: '1.5px solid #BFDBFE',
        borderRadius: '14px',
        padding: '18px 20px',
        marginBottom: '24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        textAlign: 'center',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <Clock size={28} color="#1E3A8A" />
        <div style={{ fontSize: '0.9rem', color: '#1E3A8A', fontWeight: 700, textAlign: 'center' }}>
          Status da Avaliação: <span style={{ color: '#2563EB' }}>Em Análise</span>
        </div>
        <div style={{ fontSize: '0.8rem', color: '#475569', fontWeight: 400, textAlign: 'center' }}>
          Prazo estimado de retorno: até 48 horas úteis.
        </div>
      </div>

      {/* Lead Summary Card - 100% Centralizado */}
      <div style={{ 
        textAlign: 'center', 
        background: '#F8FAFC', 
        border: '1px solid #E2E8F0',
        borderRadius: '14px',
        padding: '18px 20px',
        fontSize: '0.86rem',
        color: '#475569',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <div style={{ 
          color: '#0F172A', 
          fontWeight: 700, 
          marginBottom: '4px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          gap: '6px',
          textAlign: 'center' 
        }}>
          <CheckCircle2 size={16} color="#16A34A" /> Dados de Contato Registrados:
        </div>
        <div>Nome: <strong style={{ color: '#0F172A' }}>{leadData.nome}</strong></div>
        <div>WhatsApp: <strong style={{ color: '#0F172A' }}>{leadData.whatsapp}</strong></div>
        <div>E-mail: <strong style={{ color: '#0F172A' }}>{leadData.email}</strong></div>
        <div>Melhor Horário: <strong style={{ color: '#0F172A' }}>{leadData.horario_contato}</strong></div>
      </div>
    </div>
  );
};
