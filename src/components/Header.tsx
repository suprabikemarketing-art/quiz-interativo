import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface HeaderProps {
  onBack?: () => void;
  showBack?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ 
  onBack, 
  showBack = false
}) => {
  return (
    <div className="header-bar">
      <div style={{ width: '40px' }}>
        {showBack && onBack ? (
          <button className="header-back-btn" onClick={onBack} title="Voltar">
            <ArrowLeft size={18} />
          </button>
        ) : null}
      </div>

      <div className="header-title-text">
        Supra Bike
      </div>

      <div style={{ width: '40px' }} />
    </div>
  );
};
