import React from 'react';
import { BookOpen, ExternalLink, RotateCcw, Share2 } from 'lucide-react';

interface ContentTrackModalProps {
  onRestart: () => void;
}

export const ContentTrackModal: React.FC<ContentTrackModalProps> = ({ onRestart }) => {
  return (
    <div className="quiz-card" style={{ textAlign: 'center' }}>
      <div className="badge-clean badge-blue" style={{ margin: '0 auto 16px' }}>
        <BookOpen size={15} />
        <span>CONTEÚDO INSTITUCIONAL</span>
      </div>

      <h2 style={{ fontSize: '1.4rem', color: '#0F172A', marginBottom: '12px' }}>
        Obrigado pelo interesse na Supra Bike!
      </h2>

      <p style={{ color: '#475569', fontSize: '0.95rem', marginBottom: '24px', lineHeight: 1.6 }}>
        Entendemos que você ainda não tem o capital disponível para investir no momento. 
        Acompanhe a Supra Bike e prepare seu planejamento para o setor de mobilidade elétrica!
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
        <a 
          href="https://suprabike.com.br" 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn-next btn-red"
          style={{ textDecoration: 'none' }}
        >
          <span>Conhecer o Site Oficial</span>
          <ExternalLink size={18} />
        </a>

        <a 
          href="https://instagram.com/suprabikeoficial" 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn-secondary-light"
          style={{ textDecoration: 'none' }}
        >
          <Share2 size={18} color="#2563EB" />
          <span>Siga a Supra Bike no Instagram</span>
        </a>
      </div>

      <button 
        onClick={onRestart}
        style={{
          background: 'none',
          border: 'none',
          color: '#64748B',
          fontSize: '0.85rem',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          cursor: 'pointer'
        }}
      >
        <RotateCcw size={14} />
        <span>Reiniciar Quiz</span>
      </button>
    </div>
  );
};
