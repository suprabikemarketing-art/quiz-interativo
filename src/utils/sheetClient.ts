import type { QuizLeadPayload } from '../types/quiz';

export const DEFAULT_GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbyAWj6m99MGoOyEVMJUNEMWvzYIPf_9dkfhN6OtTKb--cLfObAxppvIqT9jybt4fhrEDg/exec';
export const DEFAULT_FORMSUBMIT_URL = 'https://formsubmit.co/ajax/88ab8f1db8e06244511faf7962617326';

const LOCAL_STORAGE_SHEET_URL_KEY = 'supra_sheet_url';
const LOCAL_STORAGE_MOCK_LEADS = 'supra_quiz_leads_mock';

export function getSheetUrl(): string {
  return (import.meta.env.VITE_GOOGLE_SHEET_URL as string) || localStorage.getItem(LOCAL_STORAGE_SHEET_URL_KEY) || DEFAULT_GOOGLE_SHEET_URL;
}

export async function saveLeadToGoogleSheet(payload: QuizLeadPayload): Promise<{ success: boolean; error?: string }> {
  // 1. Backup local no localStorage
  try {
    const existing = JSON.parse(localStorage.getItem(LOCAL_STORAGE_MOCK_LEADS) || '[]');
    existing.unshift({ ...payload, created_at: new Date().toISOString() });
    localStorage.setItem(LOCAL_STORAGE_MOCK_LEADS, JSON.stringify(existing));
  } catch (err) {
    console.warn("Aviso ao salvar no armazenamento local:", err);
  }

  const sheetUrl = getSheetUrl();

  try {
    // 2. Monta os parâmetros na ordem exata das colunas da planilha (A-O)
    const params = new URLSearchParams();
    params.append('NomeCompleto', payload.nome);
    params.append('WhatsApp', payload.whatsapp);
    params.append('Email', payload.email);
    params.append('MelhorHorarioContato', payload.horario_contato || '');
    params.append('PossuiSocio', payload.possui_socio || '');
    params.append('P1_IntencaoEmpreender', payload.p1_intencao || '');
    params.append('P2_CapitalDisponivel', payload.p2_capital || '');
    params.append('P3_OrigemCapital', payload.p3_origem_capital || '');
    params.append('P4_RegiaoPretendida', payload.p4_regiao || '');
    params.append('P5_ExperienciaNegocios', payload.p5_experiencia_negocios || '');
    params.append('P6_ExperienciaSetor', payload.p6_experiencia_setor || '');
    params.append('P7_PrazoInauguracao', payload.p7_prazo || '');

    // 3. Envio para Google Sheets (no-cors exigido pelo Apps Script)
    const sheetPromise = fetch(sheetUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params.toString()
    });

    // 4. Envio simultâneo para FormSubmit (notificação por e-mail para o time)
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
        'Melhor Horário': payload.horario_contato,
        'Possui Sócio': payload.possui_socio,
        'P1 - Intenção': payload.p1_intencao,
        'P2 - Capital': payload.p2_capital,
        'P3 - Origem Capital': payload.p3_origem_capital,
        'P4 - Região': payload.p4_regiao,
        'P5 - Experiência Negócios': payload.p5_experiencia_negocios,
        'P6 - Experiência Setor': payload.p6_experiencia_setor,
        'P7 - Prazo': payload.p7_prazo,
        _subject: `⚡ Lead Quiz Supra Bike: ${payload.nome}`,
        _template: 'table',
        _captcha: 'false'
      })
    }).catch(err => console.warn("Aviso FormSubmit:", err));

    await Promise.allSettled([sheetPromise, emailPromise]);

    return { success: true };
  } catch (err: any) {
    console.error("Erro ao enviar lead para a planilha:", err);
    return { success: true, error: err?.message };
  }
}
