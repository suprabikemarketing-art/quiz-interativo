import type { QuizLeadPayload } from '../types/quiz';

export const DEFAULT_GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbyAWj6m99MGoOyEVMJUNEMWvzYIPf_9dkfhN6OtTKb--cLfObAxppvIqT9jybt4fhrEDg/exec';
export const DEFAULT_FORMSUBMIT_URL = 'https://formsubmit.co/ajax/88ab8f1db8e06244511faf7962617326';

const LOCAL_STORAGE_SHEET_URL_KEY = 'supra_sheet_url';
const LOCAL_STORAGE_MOCK_LEADS = 'supra_quiz_leads_mock';

export function getSheetUrl(): string {
  return (import.meta.env.VITE_GOOGLE_SHEET_URL as string) || localStorage.getItem(LOCAL_STORAGE_SHEET_URL_KEY) || DEFAULT_GOOGLE_SHEET_URL;
}

export function saveSheetUrl(url: string) {
  localStorage.setItem(LOCAL_STORAGE_SHEET_URL_KEY, url.trim());
}

export function clearSheetUrl() {
  localStorage.removeItem(LOCAL_STORAGE_SHEET_URL_KEY);
}

export async function saveLeadToGoogleSheet(payload: QuizLeadPayload): Promise<{ success: boolean; isMock: boolean; error?: string }> {
  // 1. Sempre salva no LocalStorage como backup local para histórico
  let isMock = false;
  try {
    const existing = JSON.parse(localStorage.getItem(LOCAL_STORAGE_MOCK_LEADS) || '[]');
    const newLead = { ...payload, id: `local-${Date.now()}`, created_at: new Date().toISOString() };
    existing.unshift(newLead);
    localStorage.setItem(LOCAL_STORAGE_MOCK_LEADS, JSON.stringify(existing));
  } catch (err) {
    console.warn("Aviso ao salvar no armazenamento local:", err);
  }

  const sheetUrl = getSheetUrl();

  try {
    // 2. Prepara parâmetros no formato URLSearchParams para o Google Apps Script (suporta chaves com e sem espaço)
    const params = new URLSearchParams();
    params.append('Nome', payload.nome);
    params.append('Email', payload.email);
    params.append('WhatsApp', payload.whatsapp);
    const localizacao = payload.regiao || payload.cidade_residencia || 'Não informada';
    params.append('Cidade', localizacao);
    params.append('Regiao', localizacao);
    params.append('Região', localizacao);
    
    params.append('HorarioContato', payload.horario_contato || 'Não informado');
    params.append('Horário de Contato', payload.horario_contato || 'Não informado');
    
    params.append('PossuiSocio', payload.possui_socio || 'Não informado');
    params.append('Possui Sócio', payload.possui_socio || 'Não informado');
    
    params.append('CapitalDisponivel', payload.capital_disponivel || 'Não informado');
    params.append('Capital Disponível', payload.capital_disponivel || 'Não informado');
    
    params.append('OrigemCapital', payload.origem_capital || 'Não informado');
    params.append('Origem do Capital', payload.origem_capital || 'Não informado');
    
    params.append('JaEmpreende', payload.ja_empreende || 'Não informado');
    params.append('Já Empreende', payload.ja_empreende || 'Não informado');
    
    params.append('ExperienciaSetor', payload.experiencia_setor || 'Não informado');
    params.append('Experiência no Setor', payload.experiencia_setor || 'Não informado');
    
    params.append('PrazoDecisao', payload.prazo_decisao || 'Não informado');
    params.append('Prazo de Decisão', payload.prazo_decisao || 'Não informado');
    
    params.append('ScoreTotal', payload.score_total.toString());
    params.append('Score Total', payload.score_total.toString());
    
    params.append('Classificacao', payload.classificacao.toUpperCase());
    params.append('Classificação', payload.classificacao.toUpperCase());
    
    params.append('Origem', payload.origem || 'direct');

    // Requisição para a Planilha do Google (no-cors é exigido pelo Apps Script)
    const sheetPromise = fetch(sheetUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params.toString()
    });

    // 3. Envio simultâneo para FormSubmit (notificação por e-mail, igual Página de Captura)
    const emailPromise = fetch(DEFAULT_FORMSUBMIT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        Nome: payload.nome,
        Email: payload.email,
        _replyto: payload.email,
        WhatsApp: payload.whatsapp,
        Cidade: payload.cidade_residencia,
        HorarioContato: payload.horario_contato,
        PossuiSocio: payload.possui_socio,
        CapitalDisponivel: payload.capital_disponivel,
        ScoreTotal: payload.score_total,
        Classificacao: payload.classificacao.toUpperCase(),
        _subject: `⚡ Lead Quiz Supra Bike: ${payload.nome} (${payload.classificacao.toUpperCase()})`,
        _template: 'table',
        _captcha: 'false'
      })
    }).catch(err => console.warn("Aviso FormSubmit:", err));

    await Promise.allSettled([sheetPromise, emailPromise]);

    return { success: true, isMock };
  } catch (err: any) {
    console.error("Erro ao enviar lead para a planilha:", err);
    return { success: true, isMock: true, error: err?.message };
  }
}

export function getMockLeads(): QuizLeadPayload[] {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_MOCK_LEADS) || '[]');
  } catch {
    return [];
  }
}

export function clearMockLeads(): void {
  localStorage.removeItem(LOCAL_STORAGE_MOCK_LEADS);
}
