import React, { useState, useEffect } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import type { Question, Option } from '../types/quiz';

interface QuestionCardProps {
  question: Question;
  selectedOptionId?: string;
  onSelectOption: (option: Option) => void;
  onNextStep?: () => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedOptionId,
  onSelectOption,
  onNextStep
}) => {
  const [customText, setCustomText] = useState<string>('');

  useEffect(() => {
    setCustomText('');
  }, [question.id]);

  const handleOptionClick = (option: Option) => {
    if (option.requiresTextInput) {
      const currentText = customText.trim();
      const finalLabel = currentText ? `${option.label} (${currentText})` : option.label;
      onSelectOption({
        ...option,
        label: finalLabel
      });
    } else {
      onSelectOption(option);
    }
  };

  const handleTextChange = (option: Option, text: string) => {
    setCustomText(text);
    const finalLabel = text.trim() ? `${option.label}: ${text.trim()}` : option.label;
    onSelectOption({
      ...option,
      label: finalLabel
    });
  };

  return (
    <div className="quiz-card">
      <h2 className="question-heading">
        {question.title}
      </h2>

      <div className="options-group">
        {question.options.map((option) => {
          const isSelected = selectedOptionId === option.id;

          return (
            <div key={option.id} style={{ width: '100%' }}>
              <button
                className={`option-box ${isSelected ? 'selected' : ''}`}
                onClick={() => handleOptionClick(option)}
                type="button"
                style={{ 
                  borderRadius: option.requiresTextInput && isSelected ? '14px 14px 0 0' : undefined,
                  borderBottom: option.requiresTextInput && isSelected ? 'none' : undefined
                }}
              >
                <div>
                  <span className="option-box-text">{option.label}</span>
                  {option.sublabel && (
                    <span className="option-box-subtext">{option.sublabel}</span>
                  )}
                </div>

                <div className="option-circle">
                  {isSelected && <Check size={14} strokeWidth={3} />}
                </div>
              </button>

              {option.requiresTextInput && isSelected && (
                <div style={{
                  background: '#EFF6FF',
                  border: '1.5px solid #1E3A8A',
                  borderTop: 'none',
                  borderRadius: '0 0 14px 14px',
                  padding: '12px 16px',
                  marginTop: '-1px'
                }}>
                  <input
                    type="text"
                    className="input-field"
                    placeholder={option.textInputPlaceholder || 'Digite sua resposta detalhada...'}
                    value={customText}
                    onChange={(e) => handleTextChange(option, e.target.value)}
                    autoFocus
                    onClick={(e) => e.stopPropagation()}
                    style={{ fontSize: '0.9rem', padding: '10px 14px' }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {onNextStep && (
        <button 
          className={`btn-cta ${selectedOptionId ? 'btn-cta-red' : ''}`} 
          onClick={onNextStep}
          disabled={!selectedOptionId}
          style={{ opacity: selectedOptionId ? 1 : 0.65, cursor: selectedOptionId ? 'pointer' : 'not-allowed' }}
        >
          <span>Avançar</span>
          <ArrowRight size={18} />
        </button>
      )}
    </div>
  );
};
