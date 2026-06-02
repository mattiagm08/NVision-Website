// app/api/contact/route.ts
// Installa nodemailer: npm install nodemailer @types/nodemailer
//
// Configura queste variabili nel file .env.local:
//   EMAIL_USER=tuo_account@gmail.com
//   EMAIL_PASS=tua_app_password_gmail   ← usa "App Password" di Google, NON la password normale
//   EMAIL_RECIPIENT=destinatario@tuodominio.it
//
// Per Gmail: Account Google → Sicurezza → Verifica 2 passaggi ON → "Password per le app"

import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// ─── ✏️  MODIFICA QUI IL DESTINATARIO (fallback se .env non è configurato) ───
const FALLBACK_RECIPIENT = 'tua-email@esempio.it';
// ──────────────────────────────────────────────────────────────────────────────

const oggettoLabels: Record<string, string> = {
  consulenza: 'Consulenza Strategica & AI',
  tech: 'Integrazione Cloud & Cybersecurity',
  partnership: 'Proposta di Partnership Commerciale',
  altro: 'Altro / Informazioni Generali',
};

const budgetLabels: Record<string, string> = {
  low: '< 5.000 €',
  medium: '5.000 – 15.000 €',
  high: '15.000 – 50.000 €',
  enterprise: '50.000 € +',
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nome, cognome, email, telefono, azienda, oggetto, budget, messaggio, newsletter } = body;

    if (!nome || !cognome || !email || !oggetto || !messaggio) {
      return NextResponse.json({ error: 'Campi obbligatori mancanti.' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',      
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const oggettoLabel = oggettoLabels[oggetto] ?? oggetto;
    const budgetLabel  = budget ? budgetLabels[budget] ?? budget : 'Non specificato';
    const recipient    = process.env.EMAIL_RECIPIENT ?? FALLBACK_RECIPIENT;

    // ─── Oggetto email: contiene tipo di richiesta + Nome Cognome ───
    const subjectLine = `[NVision] ${oggettoLabel} — ${nome} ${cognome}`;

    const htmlBody = `
<!DOCTYPE html>
<html lang="it">
<head><meta charset="UTF-8" /><style>
  body { font-family: Arial, sans-serif; background: #f5f5f5; margin: 0; padding: 20px; }
  .card { background: #ffffff; border-radius: 12px; padding: 32px; max-width: 580px; margin: auto; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
  h2 { color: #7c3aed; font-size: 22px; margin-top: 0; }
  .badge { display: inline-block; background: #f3e8ff; color: #7c3aed; font-size: 12px; font-weight: 700; padding: 4px 10px; border-radius: 20px; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 20px; }
  table { width: 100%; border-collapse: collapse; }
  td { padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-size: 14px; color: #374151; vertical-align: top; }
  td:first-child { font-weight: 600; color: #6b7280; width: 38%; }
  .message-box { background: #fafafa; border-left: 3px solid #7c3aed; border-radius: 4px; padding: 14px 16px; margin-top: 20px; font-size: 14px; color: #1f2937; line-height: 1.6; white-space: pre-wrap; }
  .footer { text-align: center; font-size: 11px; color: #9ca3af; margin-top: 28px; }
</style></head>
<body>
  <div class="card">
    <div class="badge">Nuova richiesta</div>
    <h2>📩 ${oggettoLabel}</h2>
    <table>
      <tr><td>Nome e Cognome</td><td>${nome} ${cognome}</td></tr>
      <tr><td>Email</td><td><a href="mailto:${email}" style="color:#7c3aed">${email}</a></td></tr>
      <tr><td>Telefono</td><td>${telefono || '—'}</td></tr>
      <tr><td>Azienda</td><td>${azienda || '—'}</td></tr>
      <tr><td>Oggetto</td><td>${oggettoLabel}</td></tr>
      <tr><td>Budget stimato</td><td>${budgetLabel}</td></tr>
      <tr><td>Newsletter</td><td>${newsletter ? '✅ Sì' : '❌ No'}</td></tr>
    </table>
    <div class="message-box">${messaggio}</div>
    <div class="footer">NVision Insights™ — richiesta ricevuta automaticamente dal form di contatto</div>
  </div>
</body>
</html>
    `;

    await transporter.sendMail({
      from: `"NVision Insights™" <${process.env.EMAIL_USER}>`,
      to: recipient,
      replyTo: email,         
      subject: subjectLine,
      html: htmlBody,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[contact route] Errore invio email:', err);
    return NextResponse.json({ error: 'Errore interno durante l\'invio.' }, { status: 500 });
  }
}