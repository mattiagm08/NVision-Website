/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react';

export default function CookiesPage() {
  // Funzione segnaposto per riaprire il banner di consenso (se implementato nel tuo layout globale)
  const handleManageConsent = () => {
    if (typeof window !== 'undefined' && (window as any).Cookiebot) {
      (window as any).Cookiebot.show();
    } else {
      alert("La funzionalità di gestione del banner dipende dal plugin installato. Puoi comunque modificare le preferenze direttamente dalle impostazioni del tuo browser.");
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Cookie Policy</h1>
        <p className="text-gray-500 leading-relaxed">
          Informativa sull&apos;uso dei cookie e di tecnologie simili impiegate da NVision Insights per il funzionamento
          del sito, la sicurezza della navigazione e l&apos;eventuale analisi dell&apos;esperienza utente.
        </p>

        <div className="bg-white shadow rounded-lg p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">Cosa sono i cookie</h2>
            <p className="text-gray-600 leading-relaxed">
              I cookie sono piccoli file di testo che un sito può salvare sul dispositivo dell&apos;utente durante la
              navigazione. Servono a riconoscere il browser, mantenere alcune preferenze, rendere più efficiente la
              consultazione delle pagine e consentire determinate funzionalità tecniche. Tecnologie analoghe, come local
              storage, session storage o identificatori tecnici, possono svolgere funzioni simili.
            </p>
            <p className="text-gray-600 leading-relaxed mt-3">
              L&apos;uso dei cookie non comporta necessariamente l&apos;identificazione diretta dell&apos;utente, ma può rendere
              possibile il riconoscimento del dispositivo o del browser nel corso della medesima sessione o in visite
              successive.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">Perché utilizziamo i cookie</h2>
            <p className="text-gray-600 leading-relaxed">
              NVision Insights utilizza cookie e tecnologie simili per garantire il corretto funzionamento del sito,
              proteggere la piattaforma da utilizzi impropri, comprendere in modo aggregato come vengono consultati i
              contenuti e migliorare progressivamente chiarezza, accessibilità e qualità dell&apos;esperienza di navigazione.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">Tipologie di cookie</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-3 leading-relaxed">
              <li>
                <strong>Cookie tecnici necessari:</strong> sono indispensabili per permettere la navigazione, visualizzare
                correttamente le pagine, gestire la sicurezza, ricordare impostazioni essenziali e mantenere stabile il
                funzionamento del sito. Non richiedono il consenso dell&apos;utente.
              </li>
              <li>
                <strong>Cookie funzionali:</strong> possono essere utilizzati per ricordare preferenze espresse
                dall&apos;utente, come eventuali impostazioni di visualizzazione o scelte relative alla navigazione.
              </li>
              <li>
                <strong>Cookie analitici:</strong> consentono di raccogliere informazioni statistiche, preferibilmente in
                forma aggregata, sul numero di visite, sulle pagine più consultate e sulle modalità generali di utilizzo
                del sito. Quando non sono anonimizzati o equiparabili ai cookie tecnici, vengono utilizzati solo previo
                consenso.
              </li>
              <li>
                <strong>Cookie di terze parti:</strong> possono essere impostati da servizi esterni eventualmente
                integrati nel sito, come strumenti di analytics, contenuti incorporati, mappe, video, social network o
                piattaforme di gestione comunicazioni.
              </li>
              <li>
                <strong>Cookie di marketing o profilazione:</strong> se introdotti in futuro, saranno utilizzati solo
                dopo consenso esplicito dell&apos;utente e con adeguata informazione sulle relative finalità.
              </li>
            </ul>
          </section>

          {/* Nuova sezione: Elenco ed inventario dei cookie effettivi */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">Cookie effettivamente utilizzati dal sito</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Di seguito vengono elencati nel dettaglio i singoli cookie installati sul browser dell&apos;utente navigando su NVision Insights:
            </p>
            <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
              <table className="min-w-full divide-y divide-gray-200 text-left text-sm text-gray-600">
                <thead className="bg-gray-50 text-gray-700 uppercase text-xs font-semibold">
                  <tr>
                    <th className="px-4 py-3">Nome Cookie</th>
                    <th className="px-4 py-3">Fornitore / Terza Parte</th>
                    <th className="px-4 py-3">Scopo / Tipologia</th>
                    <th className="px-4 py-3">Durata / Scadenza</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  <tr>
                    <td className="px-4 py-3 font-mono text-purple-600">nvision_consent_status</td>
                    <td className="px-4 py-3 ">Interno (Sito)</td>
                    <td className="px-4 py-3">Tecnico: memorizza la scelta effettuata dall&apos;utente sul banner dei cookie.</td>
                    <td className="px-4 py-3">1 anno</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-purple-600">_ga</td>
                    <td className="px-4 py-3">Google Analytics (Terza parte)</td>
                    <td className="px-4 py-3">Analitico: statistica anonimizzata per identificare gli utenti unici in modo aggregato.</td>
                    <td className="px-4 py-3">2 anni</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-purple-600">_ga_*</td>
                    <td className="px-4 py-3">Google Analytics (Terza parte)</td>
                    <td className="px-4 py-3">Analitico: mantiene lo stato della sessione di navigazione corrente dell&apos;utente.</td>
                    <td className="px-4 py-3">2 anni</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">Cookie tecnici e consenso</h2>
            <p className="text-gray-600 leading-relaxed">
              I cookie tecnici sono necessari per consentire il funzionamento ordinario del sito e, per tale ragione,
              possono essere installati senza richiedere un consenso preventivo. L&apos;utente può comunque limitarli o
              bloccarli tramite le impostazioni del browser, tenendo presente che alcune funzionalità potrebbero risultare
              compromesse o meno efficienti.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">Cookie analitici e strumenti di misurazione</h2>
            <p className="text-gray-600 leading-relaxed">
              Qualora NVision Insights utilizzi strumenti di misurazione del traffico, questi avranno lo scopo di
              comprendere quali contenuti risultano più utili, quali sezioni richiedono miglioramenti e come rendere il
              sito più chiaro e performante. I dati raccolti saranno trattati, ove possibile, in forma aggregata e non
              saranno impiegati per decisioni automatizzate individuali.
            </p>
          </section>

          {/* Nuova sezione: Link alle informative esterne */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">Cookie e servizi di terze parti</h2>
            <p className="text-gray-600 leading-relaxed">
              Alcuni servizi esterni possono impostare cookie o raccogliere informazioni secondo proprie informative.
              NVision Insights non controlla direttamente le modalità con cui tali soggetti trattano i dati, ma si impegna
              a selezionare strumenti coerenti con un uso proporzionato e trasparente delle tecnologie di tracciamento.
            </p>
            <p className="text-gray-600 leading-relaxed mt-3">
              Per maggiori informazioni sui trattamenti operati dai nostri partner tecnologici, ti invitiamo a consultare le rispettive informative:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 leading-relaxed mt-3">
              <li>
                Google Analytics / Google Fonts:{' '}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-purple-600 underline">
                  Privacy Policy di Google
                </a>
              </li>
              <li>
                Vercel (Cloud Hosting):{' '}
                <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-purple-600 underline">
                  Privacy Policy di Vercel
                </a>
              </li>
            </ul>
          </section>

          {/* Nuova sezione: Pulsante di gestione dinamico del consenso */}
          <section className=" border border-purple-100 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-black mb-2">Modifica o revoca il tuo consenso</h2>
            <p className="text-gray-600 leading-relaxed mb-4 text-sm">
              Puoi rivedere, modificare o revocare in qualsiasi momento le preferenze espresse per i cookie opzionali (come quelli analitici o di tracciamento) direttamente tramite il nostro centro di gestione.
            </p>
            <button
              onClick={handleManageConsent}
              className="inline-flex items-center justify-center px-5 py-2.5 border border-transparent text-sm font-semibold rounded-full text-white bg-black hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors shadow-sm"
            >
              Clicca qui per modificare le tue preferenze sui Cookie
            </button>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">Gestione delle preferenze tramite Browser</h2>
            <p className="text-gray-600 leading-relaxed">
              L&apos;utente può gestire le proprie preferenze sui cookie attraverso le impostazioni del browser utilizzato.
              I principali browser permettono di visualizzare, cancellare, bloccare o limitare i cookie già installati e
              di impostare regole diverse per i singoli siti web.
            </p>
            <p className="text-gray-600 leading-relaxed mt-3">
              La disattivazione generalizzata dei cookie può incidere sulla qualità della navigazione e impedire il
              corretto funzionamento di alcune funzionalità. Per i cookie non necessari, ove presenti, il consenso potrà
              essere espresso, modificato o revocato secondo le modalità rese disponibili dal sito.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">Aggiornamenti della Cookie Policy</h2>
            <p className="text-gray-600 leading-relaxed">
              La presente Cookie Policy potrà essere aggiornata in caso di modifiche tecniche al sito, introduzione di
              nuovi servizi, variazioni normative o evoluzioni delle modalità di gestione del consenso. La versione più
              recente sarà sempre pubblicata su questa pagina.
            </p>
          </section>

          <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="h-fit w-fit"
            >
              <Link 
                href="/" 
                className="bg-black text-white px-12 py-4 rounded-full font-bold hover:bg-purple-500 hover:text-white transition-all duration-300 flex items-center shadow-lg text-sm"
              >
                Homepage
              </Link>
            </motion.div>

          <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <p className="text-sm text-gray-500">Ultimo aggiornamento: 2 giugno 2026</p>
          </div>
        </div>
      </div>
    </main>
  );
}