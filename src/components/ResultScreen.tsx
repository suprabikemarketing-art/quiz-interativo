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
    <div className="quiz-card" style={{ textAlign: 'center', padding: '32px 24px' }}>
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
        fontWeight: 800
      }}>
        Inscrição Concluída com Sucesso!
      </h1>

      <p style={{ 
        color: '#1E3A8A', 
        fontWeight: 700, 
        fontSize: '1rem', 
        marginBottom: '16px' 
      }}>
        Obrigado por se inscrever para a expansão Supra Bike.
      </p>

      <p style={{ 
        color: '#475569', 
        fontSize: '0.95rem', 
        marginBottom: '28px', 
        lineHeight: 1.6 
      }}>
        Recebemos todas as suas informações com segurança. Nossa equipe comercial e de expansão avaliará o seu perfil e entrará em contato com você o mais breve possível via WhatsApp.
      </p>

      {/* Status Box */}
      <div style={{
        background: '#EFF6FF',
        border: '1.5px solid #BFDBFE',
        borderRadius: '14px',
        padding: '16px 20px',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        textAlign: 'left'
      }}>
        <Clock size={24} color="#1E3A8A" style={{ flexShrink: 0 }} />
        <div style={{ fontSize: '0.86rem', color: '#1E3A8A', fontWeight: 600 }}>
          Status da Avaliação: <strong>Em Análise Comercial</strong>
          <div style={{ fontSize: '0.78rem', color: '#475569', fontWeight: 400, marginTop: '2px' }}>
            Aguarde nossa ligação ou mensagem comercial nos próximos dias.
          </div>
        </div>
      </div>

      {/* Lead Summary Card */}
      <div style={{ 
        textAlign: 'left', 
        background: '#F8FAFC', 
        border: '1px solid #E2E8F0',
        borderRadius: '14px',
        padding: '16px 20px',
        fontSize: '0.86rem',
        color: '#475569',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px'
      }}>
        <div style={{ color: '#0F172A', fontWeight: 700, marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <CheckCircle2 size={16} color="#16A34A" /> Dados de Contato Registrados:
        </div>
        <div>• Nome: <strong>{leadData.nome}</strong></div>
        <div>• WhatsApp: <strong>{leadData.whatsapp}</strong></div>
        <div>• E-mail: <strong>{leadData.email}</strong></div>
        <div>• Melhor Horário p/ Contato: <strong>{leadData.horario_contato}</strong></div>
      </div>
    </div>
  );
};
