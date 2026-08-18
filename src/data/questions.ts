import type { Question } from '../types/quiz';

export const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    title: "Você já pensou em empreender no setor de mobilidade elétrica?",
    subtitle: "Escolha a opção que melhor reflete seu momento atual",
    options: [
      {
        id: 'q1_sim',
        label: 'Sim, é meu objetivo principal',
        sublabel: 'Quero aproveitar o crescimento de scooters e e-bikes',
        points: 2
      },
      {
        id: 'q1_curiosidade',
        label: 'Tenho curiosidade sobre o setor',
        sublabel: 'Estou pesquisando opções de investimento',
        points: 0
      },
      {
        id: 'q1_nao',
        label: 'Não tinha pensado, mas me interessei',
        sublabel: 'Conheci a Supra Bike recentemente',
        points: 0
      }
    ]
  },
  {
    id: 2,
    title: "Qual valor você tem disponível para investir hoje?",
    subtitle: "Selecione a faixa de capital líquido para investimento na franquia",
    options: [
      {
        id: 'q2_acima_200k',
        label: 'Acima de R$ 200.000',
        sublabel: 'Perfil ideal pronto para unidade completa ou flagship',
        points: 4
      },
      {
        id: 'q2_100_200k',
        label: 'De R$ 100.000 a R$ 200.000',
        sublabel: 'Capital adequado para modelo standard Supra Bike',
        points: 3
      },
      {
        id: 'q2_50_100k',
        label: 'De R$ 50.000 a R$ 100.000',
        sublabel: 'Capital de entrada com potencial de composição',
        points: 2
      },
      {
        id: 'q2_abaixo_50k',
        label: 'Abaixo de R$ 50.000',
        sublabel: 'Início de reserva para investimento',
        points: 1
      },
      {
        id: 'q2_nao_tenho',
        label: 'Ainda não possuo capital disponível',
        sublabel: 'Gostaria apenas de aprender sobre a marca',
        points: 0,
        deviatesToContentTrack: true
      }
    ]
  },
  {
    id: 3,
    title: "Esse valor de investimento é de capital próprio ou financiamento?",
    subtitle: "Saber a origem dos recursos nos ajuda a projetar o tempo de abertura",
    options: [
      {
        id: 'q3_proprio',
        label: 'Capital 100% próprio disponível',
        sublabel: 'Pronto para alocação sem dependência de terceiros',
        points: 2
      },
      {
        id: 'q3_misto',
        label: 'Misto (Capital próprio + Financiamento)',
        sublabel: 'Possuo parte do recurso e pretendo complementar',
        points: 1
      },
      {
        id: 'q3_financiamento',
        label: 'Pretendo buscar financiamento integral',
        sublabel: 'Dependerei de aprovação de crédito bancário',
        points: 0
      }
    ]
  },
  {
    id: 4,
    title: "Em qual cidade ou região você pretende abrir sua unidade?",
    subtitle: "A Supra Bike prioriza praças estratégicas de expansão",
    options: [
      {
        id: 'q4_regiao_prioritaria',
        label: 'Rio de Janeiro / Juiz de Fora / Guarulhos',
        sublabel: 'Praças prioritárias com alta demanda e suporte rápido',
        points: 2
      },
      {
        id: 'q4_outra_regiao',
        label: 'Outra cidade ou região',
        sublabel: 'Informe a cidade e estado de sua preferência',
        points: 1,
        requiresTextInput: true,
        textInputPlaceholder: 'Digite sua cidade/UF (ex: Belo Horizonte / MG)'
      }
    ]
  },
  {
    id: 5,
    title: "Você já teve ou administra algum negócio hoje?",
    subtitle: "Experiência prévia em gestão acelera a rampagem da franquia",
    options: [
      {
        id: 'q5_sim_ativo',
        label: 'Sim, sou empresário ativo',
        sublabel: 'Já possuo experiência em gestão de equipes e vendas',
        points: 2
      },
      {
        id: 'q5_ja_tive',
        label: 'Já tive negócio anteriormente',
        sublabel: 'Possuo vivência comercial e de negócios',
        points: 1
      },
      {
        id: 'q5_nunca',
        label: 'Nunca empreendi, seria minha primeira franquia',
        sublabel: 'Busco a segurança do modelo testado Supra Bike',
        points: 1
      }
    ]
  },
  {
    id: 6,
    title: "Você já trabalhou ou tem relação com o setor de veículos ou varejo?",
    subtitle: "Avaliamos seu fit e familiaridade com vendas e atendimento",
    options: [
      {
        id: 'q6_diretamente',
        label: 'Sim, atuo/atuei com veículos ou mobilidade',
        sublabel: 'Tenho experiência direta no segmento automotivo ou de motos',
        points: 2
      },
      {
        id: 'q6_varejo',
        label: 'Já atuei com vendas ou comércio em geral',
        sublabel: 'Possuo bagagem de atendimento e negociação com clientes',
        points: 1
      },
      {
        id: 'q6_nenhuma',
        label: 'Nenhuma experiência no setor',
        sublabel: 'Busco treinamento completo da franqueadora',
        points: 0
      }
    ]
  },
  {
    id: 7,
    title: "Em quanto tempo pretende inaugurar sua operação?",
    subtitle: "Seu cronograma nos ajuda a priorizar o atendimento comercial",
    options: [
      {
        id: 'q7_ate_30',
        label: 'Em até 30 dias (Imediato)',
        sublabel: 'Tenho decisão tomada e recursos prontos',
        points: 3
      },
      {
        id: 'q7_30_90',
        label: 'De 30 a 90 dias (Curto prazo)',
        sublabel: 'Planejamento em andamento para os próximos meses',
        points: 2
      },
      {
        id: 'q7_3_6_meses',
        label: 'Em 3 a 6 meses (Médio prazo)',
        sublabel: 'Organizando capital e planejamento territorial',
        points: 1
      },
      {
        id: 'q7_outro_prazo',
        label: 'Outro prazo específico (digite seu tempo)',
        sublabel: 'Informe exatamente em quanto tempo pretende abrir',
        points: 1,
        requiresTextInput: true,
        textInputPlaceholder: 'Digite seu prazo (ex: em 45 dias, no 2º semestre)'
      },
      {
        id: 'q7_sem_prazo',
        label: 'Sem prazo definido / Apenas estudando',
        sublabel: 'Projeto para o longo prazo',
        points: 0
      }
    ]
  }
];
