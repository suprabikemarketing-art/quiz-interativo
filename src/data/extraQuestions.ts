import type { Question } from '../types/quiz';

export const EXTRA_QUALIFICATION_QUESTIONS: Question[] = [
  // Categoria 1: Dedicação / Operação
  {
    id: 101,
    title: "Você pretende administrar a unidade pessoalmente ou contratar um gestor?",
    category: "Dedicação / Operação",
    options: [
      { id: 'ex_adm_pessoal', label: 'Pessoalmente (Operação direta)', sublabel: 'Comprometimento total com a unidade', points: 2 },
      { id: 'ex_adm_gestor', label: 'Gestor contratado', sublabel: 'Acompanhamento executivo da gestão', points: 1 },
      { id: 'ex_adm_indefinido', label: 'Ainda não decidi', sublabel: 'Avaliando modelo ideal de dedicação', points: 0 }
    ]
  },
  {
    id: 102,
    title: "Quanto tempo por semana você teria disponível para se dedicar ao negócio?",
    category: "Dedicação / Operação",
    options: [
      { id: 'ex_tempo_integral', label: 'Tempo integral (40h+/semana)', sublabel: 'Foco exclusivo na operação Supra Bike', points: 2 },
      { id: 'ex_tempo_meio', label: 'Meio período (20h a 30h/semana)', sublabel: 'Dedicação parcial com equipe operacional', points: 1 },
      { id: 'ex_tempo_investidor', label: 'Apenas como investidor (sem operação)', sublabel: 'Aporte de capital sem atuação direta', points: 0 }
    ]
  },

  // Categoria 2: Capacidade Financeira & Imóvel
  {
    id: 103,
    title: "Esse valor de investimento é capital próprio ou você pretende buscar financiamento?",
    category: "Capacidade Financeira",
    options: [
      { id: 'ex_cap_proprio', label: 'Capital 100% próprio disponível', sublabel: 'Recurso líquido pronto para alocação rápida', points: 2 },
      { id: 'ex_cap_misto', label: 'Misto (Capital próprio + Financiamento)', sublabel: 'Parte própria e parte complementar', points: 1 },
      { id: 'ex_cap_financiamento', label: 'Financiamento bancário integral', sublabel: 'Dependerá de aprovação de crédito', points: 0 }
    ]
  },
  {
    id: 104,
    title: "Você já tem ponto comercial ou imóvel disponível, ou precisaria buscar um?",
    category: "Capacidade Financeira",
    options: [
      { id: 'ex_ponto_ja_tenho', label: 'Já tenho ponto/imóvel disponível', sublabel: 'Imóvel próprio ou já em negociação', points: 2 },
      { id: 'ex_ponto_buscar', label: 'Preciso buscar um ponto comercial', sublabel: 'Contarei com suporte de geomarketing', points: 1 },
      { id: 'ex_ponto_nao_sei', label: 'Não sei ainda', sublabel: 'Avaliarei opções após reunião comercial', points: 0 }
    ]
  },

  // Categoria 3: Experiência e Fit com o Setor
  {
    id: 105,
    title: "Você já trabalhou ou tem alguma relação com o setor automotivo, motos ou mobilidade?",
    category: "Fit com o Setor",
    options: [
      { id: 'ex_fit_direto', label: 'Sim, diretamente no setor', sublabel: 'Vivência em veículos, peças ou oficinas', points: 2 },
      { id: 'ex_fit_varejo', label: 'Já atuei com vendas ou varejo', sublabel: 'Experiência prévia em atendimento ao cliente', points: 1 },
      { id: 'ex_fit_nenhuma', label: 'Nenhuma experiência no setor', sublabel: 'Busco capacitação do modelo formatado', points: 0 }
    ]
  },
  {
    id: 106,
    title: "Como você avalia seu conhecimento sobre gestão de estoque e vendas?",
    category: "Fit com o Setor",
    options: [
      { id: 'ex_gestao_exp', label: 'Tenho experiência em gestão e vendas', sublabel: 'Familiarizado com controle de estoque e metas', points: 2 },
      { id: 'ex_gestao_aprender', label: 'Nunca gerenciei, mas quero aprender', sublabel: 'Utilizarei o treinamento operacional da franqueadora', points: 1 }
    ]
  },

  // Categoria 4: Expectativa e Modelo de Franquia
  {
    id: 107,
    title: "Você já pesquisou como funciona um contrato de franquia (royalties, taxa de franquia, padronização)?",
    category: "Modelo de Franquia",
    options: [
      { id: 'ex_contrato_entendo', label: 'Sim, já entendo bem o modelo', sublabel: 'Ciente de taxas, suporte e padronização', points: 2 },
      { id: 'ex_contrato_ouvi', label: 'Já ouvi falar, mas quero entender melhor', sublabel: 'Desejo tirar dúvidas jurídicas e operacionais', points: 1 },
      { id: 'ex_contrato_primeira', label: 'Não, é minha primeira vez pesquisando', sublabel: 'Busco orientação do zero', points: 0 }
    ]
  },
  {
    id: 108,
    title: "O que você espera de retorno nos primeiros 12 meses?",
    category: "Modelo de Franquia",
    options: [
      { id: 'ex_retorno_recuperar', label: 'Recuperar o investimento inicial (Payback)', sublabel: 'Expectativa focada na maturação do negócio', points: 2 },
      { id: 'ex_retorno_renda', label: 'Gerar renda extra consistente', sublabel: 'Complementar o orçamento mensal', points: 1 },
      { id: 'ex_retorno_avaliando', label: 'Só avaliando o mercado ainda', sublabel: 'Sem pressão de prazo curto', points: 0 }
    ]
  },

  // Categoria 5: Urgência e Concorrência
  {
    id: 109,
    title: "Você está avaliando outras franquias do setor além da Supra Bike?",
    category: "Urgência e Concorrência",
    options: [
      { id: 'ex_concorrencia_so_supra', label: 'Só a Supra Bike (Foco exclusivo)', sublabel: 'Identificação total com a marca', points: 2 },
      { id: 'ex_concorrencia_comparando', label: 'Estou comparando com outras franquias', sublabel: 'Avaliando rentabilidade de concorrentes', points: 1 },
      { id: 'ex_concorrencia_nao_pesquisei', label: 'Ainda não pesquisei outras', sublabel: 'Supra Bike é minha primeira opção', points: 1 }
    ]
  }
];
