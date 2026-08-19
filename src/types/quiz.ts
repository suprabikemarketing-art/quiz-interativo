export type Classification = 'alto' | 'medio' | 'baixo';

export interface Option {
  id: string;
  label: string;
  sublabel?: string;
  points: number;
  iconName?: string;
  deviatesToContentTrack?: boolean;
  requiresTextInput?: boolean;
  textInputPlaceholder?: string;
}

export interface Question {
  id: number;
  title: string;
  subtitle?: string;
  category?: string;
  options: Option[];
}

export interface QuizAnswer {
  questionId: number;
  optionId: string;
  optionLabel: string;
  points: number;
  deviatesToContentTrack?: boolean;
  customValue?: string;
}

export interface LeadFormData {
  nome: string;
  whatsapp: string;
  email: string;
  cidade_residencia: string;
  horario_contato: string;
  possui_socio: string;
  honeypot?: string; // Antispam
}

// Banco completo de perguntas extras de refinamento
export interface RefinementDetails {
  dedicacao_operacao?: string;
  tempo_semanal?: string;
  origem_capital?: string;
  ponto_comercial?: string;
  experiencia_setor?: string;
  gestao_estoque_vendas?: string;
  contrato_franquia?: string;
  expectativa_retorno?: string;
  avaliando_concorrencia?: string;
}

export interface QuizLeadPayload {
  nome: string;
  whatsapp: string;
  email: string;
  horario_contato: string;
  possui_socio: string;
  p1_intencao: string;
  p2_capital: string;
  p3_origem_capital: string;
  p4_regiao: string;
  p5_experiencia_negocios: string;
  p6_experiencia_setor: string;
  p7_prazo: string;
}

export interface ScoreResult {
  totalScore: number;
  classification: Classification;
  title: string;
  subtitle: string;
  description: string;
  badgeLabel: string;
  badgeClass: string;
  ctaText: string;
  actionType: 'whatsapp' | 'manychat' | 'institutional';
  ctaLink: string;
  whatsappMessage?: string;
}
