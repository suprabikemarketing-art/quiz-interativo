import type { Classification, QuizAnswer, ScoreResult, LeadFormData } from '../types/quiz';

export function calculateQuizScore(answers: Record<number, QuizAnswer>): number {
  return Object.values(answers).reduce((acc, accAns) => acc + (accAns.points || 0), 0);
}

export function getClassification(score: number): Classification {
  if (score >= 12) return 'alto';
  if (score >= 7) return 'medio';
  return 'baixo';
}

export function generateScoreResult(score: number, leadData?: LeadFormData): ScoreResult {
  const classification = getClassification(score);

  if (classification === 'alto') {
    const rawPhone = "5521999999999";
    const textMsg = encodeURIComponent(
      `Olá, time Supra Bike! Fiz o quiz de franqueado e meu perfil é *Investidor Qualificado* (Score: ${score}/17).\n\n` +
      `*Nome:* ${leadData?.nome || ''}\n` +
      `*WhatsApp:* ${leadData?.whatsapp || ''}\n` +
      `*E-mail:* ${leadData?.email || ''}\n` +
      `*Cidade/UF de Residência:* ${leadData?.cidade_residencia || ''}\n` +
      `*Melhor Horário p/ Ligação:* ${leadData?.horario_contato || ''}\n` +
      `*Possui Sócio:* ${leadData?.possui_socio || ''}\n\n` +
      `Gostaria de agendar uma reunião comercial para conhecer os modelos de franquia!`
    );

    return {
      totalScore: score,
      classification: 'alto',
      title: 'Perfil Investidor Qualificado',
      subtitle: 'Excelente alinhamento estratégico com o modelo de expansão Supra Bike',
      description: 'Você possui capital próprio, praça estratégica e timing imediato para liderar uma unidade Supra Bike no mercado de mobilidade elétrica.',
      badgeLabel: 'SCORE ALTO — INVESTIDOR QUALIFICADO',
      badgeClass: 'badge-red',
      ctaText: 'Falar com o time comercial no WhatsApp',
      actionType: 'whatsapp',
      ctaLink: `https://wa.me/${rawPhone}?text=${textMsg}`,
      whatsappMessage: textMsg
    };
  }

  if (classification === 'medio') {
    return {
      totalScore: score,
      classification: 'medio',
      title: 'Perfil Empreendedor em Potencial',
      subtitle: 'Seu perfil atende aos pilares essenciais da marca Supra Bike',
      description: 'Você está no caminho certo para empreender no setor elétrico. Enviamos a apresentação comercial completa para seu e-mail e ativamos seu atendimento automatizado.',
      badgeLabel: 'SCORE MÉDIO — POTENCIAL EXPANSÃO',
      badgeClass: 'badge-blue',
      ctaText: 'Receber Apresentação no WhatsApp',
      actionType: 'manychat',
      ctaLink: 'https://m.me/suprabikeoficial?ref=quiz_franquia_medio'
    };
  }

  return {
    totalScore: score,
    classification: 'baixo',
    title: 'Perfil Explorador de Mobilidade',
    subtitle: 'Obrigado pelo seu interesse no universo de veículos elétricos Supra Bike',
    description: 'Neste momento recomendamos que você acompanhe nossos conteúdos exclusivos, conheça nossos veículos e entenda melhor o mercado antes do investimento.',
    badgeLabel: 'SCORE INICIAL — CONTEÚDO INSTITUCIONAL',
    badgeClass: 'badge-gray',
    ctaText: 'Conhecer mais sobre a Supra Bike',
    actionType: 'institutional',
    ctaLink: 'https://suprabike.com.br'
  };
}
