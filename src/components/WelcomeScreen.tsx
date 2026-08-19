import React from 'react';
import { ArrowRight } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="quiz-card">
      <h1 style={{ 
        fontSize: 'clamp(1.6rem, 5vw, 2.2rem)', 
        lineHeight: 1.25, 
        marginBottom: '16px',
        color: '#0F172A'
      }}>
        Encontre seu perfil de franqueado <span style={{ color: '#1E3A8A' }}>Supra Bike</span>
      </h1>

      <p style={{ color: '#475569', fontSize: '1rem', marginBottom: '24px', lineHeight: 1.6 }}>
        Responda a 7 perguntas objetivas sobre seu capital, região e momento de negócio para receber a avaliação imediata de viabilidade da sua unidade.
      </p>

      {/* Clean features list without icon box pills */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
          <span style={{ color: '#1E3A8A', fontWeight: 800, fontSize: '1.1rem', lineHeight: 1 }}>•</span>
          <span style={{ color: '#1E293B', fontSize: '0.95rem', fontWeight: 600 }}>
            Mais de 2 milhões de seguidores e alcance consolidado nas redes
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
          <span style={{ color: '#1E3A8A', fontWeight: 800, fontSize: '1.1rem', lineHeight: 1 }}>•</span>
          <span style={{ color: '#1E293B', fontSize: '0.95rem', fontWeight: 600 }}>
            Mercado de mobilidade elétrica em alta expansão nacional
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
          <span style={{ color: '#1E3A8A', fontWeight: 800, fontSize: '1.1rem', lineHeight: 1 }}>•</span>
          <span style={{ color: '#1E293B', fontSize: '0.95rem', fontWeight: 600 }}>
            Modelos de negócio testados com suporte comercial completo
          </span>
        </div>
      </div>

      <button className="btn-cta btn-cta-red" onClick={onStart} style={{ padding: '18px 24px' }}>
        <span>Iniciar Teste de Qualificação</span>
        <ArrowRight size={20} />
      </button>
    </div>
  );
};
