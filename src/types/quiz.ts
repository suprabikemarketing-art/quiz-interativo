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
  id?: string;
  nome: string;
  whatsapp: string;
  email: string;
  cidade_residencia: string;
  horario_contato: string;
  possui_socio: string;
  capital_disponivel: string;
  origem_capital: string;
  regiao: string;
  ja_empreende: string;
  experiencia_setor: string;
  prazo_decisao: string;
  // Campos extras do banco de perguntas
  dedicacao_operacao?: string;
  tempo_semanal?: string;
  ponto_comercial?: string;
  gestao_estoque_vendas?: string;
  contrato_franquia?: string;
  expectativa_retorno?: string;
  avaliando_concorrencia?: string;
  score_total: number;
  classificacao: Classification;
  origem: string;
  created_at?: string;
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
