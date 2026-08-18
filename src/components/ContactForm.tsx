import React, { useState } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
import type { LeadFormData } from '../types/quiz';
import { formatWhatsApp, cleanPhoneDigits } from '../utils/formatters';

interface ContactFormProps {
  onSubmit: (data: LeadFormData) => void;
  isLoading?: boolean;
}

export const ContactForm: React.FC<ContactFormProps> = ({ onSubmit, isLoading = false }) => {
  const [nome, setNome] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [horarioContato, setHorarioContato] = useState('Manhã (08h às 12h)');
  const [possuiSocio, setPossuiSocio] = useState('Não, serei investidor único');
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<{ nome?: string; whatsapp?: string; email?: string }>({});

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatWhatsApp(e.target.value);
    setWhatsapp(formatted);
    if (errors.whatsapp) setErrors(prev => ({ ...prev, whatsapp: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (honeypot.trim() !== '') {
      return;
    }

    const newErrors: { nome?: string; whatsapp?: string; email?: string } = {};

    if (!nome.trim() || nome.trim().length < 3) {
      newErrors.nome = 'Informe seu nome completo';
    }

    const rawPhone = cleanPhoneDigits(whatsapp);
    if (rawPhone.length < 10) {
      newErrors.whatsapp = 'Digite seu número de WhatsApp com DDD';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      newErrors.email = 'Informe um e-mail válido';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit({
      nome: nome.trim(),
      whatsapp,
      email: email.trim(),
      cidade_residencia: '',
      horario_contato: horarioContato,
      possui_socio: possuiSocio,
      honeypot
    });
  };

  return (
    <div className="quiz-card">
      <h2 className="question-heading" style={{ marginBottom: '8px' }}>
        Onde devemos enviar seu resultado?
      </h2>

      <p style={{ color: '#475569', fontSize: '0.92rem', marginBottom: '24px' }}>
        Preencha os dados de contato para liberar o relatório de viabilidade da sua unidade.
      </p>

      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="website_url_hp" 
          value={honeypot} 
          onChange={(e) => setHoneypot(e.target.value)} 
          className="hp-field"
          tabIndex={-1}
          aria-hidden="true"
        />

        <div style={{ marginBottom: '16px' }}>
          <label className="input-label">Nome Completo</label>
          <input
            type="text"
            className="input-field"
            placeholder="Ex: Carlos Silva"
            value={nome}
            onChange={(e) => {
              setNome(e.target.value);
              if (errors.nome) setErrors(prev => ({ ...prev, nome: undefined }));
            }}
            disabled={isLoading}
          />
          {errors.nome && <span style={{ color: '#DC2626', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>{errors.nome}</span>}
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label className="input-label">WhatsApp (com DDD)</label>
          <input
            type="tel"
            className="input-field"
            placeholder="(21) 99999-8888"
            value={whatsapp}
            onChange={handlePhoneChange}
            disabled={isLoading}
          />
          {errors.whatsapp && <span style={{ color: '#DC2626', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>{errors.whatsapp}</span>}
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label className="input-label">E-mail Principal</label>
          <input
            type="email"
            className="input-field"
            placeholder="carlos@exemplo.com.br"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors(prev => ({ ...prev, email: undefined }));
            }}
            disabled={isLoading}
          />
          {errors.email && <span style={{ color: '#DC2626', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>{errors.email}</span>}
        </div>


        <div style={{ marginBottom: '16px' }}>
          <label className="input-label">Melhor horário para ligação / contato</label>
          <select 
            className="input-field"
            value={horarioContato}
            onChange={(e) => setHorarioContato(e.target.value)}
            disabled={isLoading}
            style={{ cursor: 'pointer', appearance: 'auto' }}
          >
            <option value="Manhã (08h às 12h)">Manhã (08h às 12h)</option>
            <option value="Tarde (12h às 18h)">Tarde (12h às 18h)</option>
            <option value="Noite (18h às 21h)">Noite (18h às 21h)</option>
            <option value="Qualquer horário">Qualquer horário comercial</option>
          </select>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label className="input-label">Possui sócio para a franquia?</label>
          <select 
            className="input-field"
            value={possuiSocio}
            onChange={(e) => setPossuiSocio(e.target.value)}
            disabled={isLoading}
            style={{ cursor: 'pointer', appearance: 'auto' }}
          >
            <option value="Não, serei investidor único">Não, serei investidor único</option>
            <option value="Sim, terei sócio(s)">Sim, terei sócio(s)</option>
            <option value="Em definição">Em definição</option>
          </select>
        </div>

        <button type="submit" className="btn-cta btn-cta-red" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              <span>Processando Resultado...</span>
            </>
          ) : (
            <>
              <span>Ver Meu Resultado</span>
              <ArrowRight size={18} />
            </>
          )}
        </button>

        <p style={{ textAlign: 'center', fontSize: '0.78rem', color: '#94A3B8', marginTop: '14px' }}>
          Seus dados estão seguros e protegidos.
        </p>
      </form>
    </div>
  );
};
