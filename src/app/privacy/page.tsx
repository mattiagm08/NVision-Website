"use client"; // Decisivo per far funzionare framer-motion in Next.js (App Router)

import { motion } from 'framer-motion';
import Link from 'next/link'; // Import corretto di Next.js
import React from 'react';

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
        <p className="text-gray-500 leading-relaxed">
          Informativa sul trattamento dei dati personali degli utenti che consultano il sito NVision Insights e utilizzano
          i servizi di contatto messi a disposizione attraverso la piattaforma.
        </p>

        <div className="bg-white shadow rounded-lg p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">Premessa</h2>
            <p className="text-gray-600 leading-relaxed">
              NVision Insights attribuisce particolare importanza alla riservatezza, alla protezione dei dati personali
              e alla trasparenza nei confronti dei propri utenti. La presente informativa descrive quali dati possono
              essere raccolti attraverso il sito, per quali finalità vengono trattati, con quali modalità sono custoditi
              e quali diritti possono essere esercitati dagli interessati.
            </p>
            <p className="text-gray-600 leading-relaxed mt-3">
              Il sito ha natura informativa, editoriale e professionale: pubblica contenuti relativi a tecnologia,
              innovazione, intelligenza artificiale, trasformazione digitale e servizi connessi. L&apos;utilizzo del sito
              comporta il trattamento di alcune informazioni tecniche necessarie alla navigazione e, quando l&apos;utente
              decide di contattarci, dei dati volontariamente trasmessi tramite i moduli o gli indirizzi email indicati.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">Titolare del trattamento</h2>
            <p className="text-gray-600 leading-relaxed">
              Il titolare del trattamento dei dati personali è Mattia Filippo Gimmillaro, in qualità di gestore e creatore del progetto personale NVision Insights, contattabile all&apos;indirizzo email
              <a href="mailto:info.nvisioninsights@gmail.com" className="text-purple-600 underline ml-1">
                info.nvisioninsights@gmail.com
              </a>.
            </p>
            <p className="text-gray-600 leading-relaxed mt-3">
              Il titolare determina le finalità e i mezzi del trattamento dei dati personali raccolti tramite il sito,
              adottando misure organizzative e tecniche ragionevoli per tutelarne integrità, disponibilità e riservatezza.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">Categorie di dati trattati</h2>
            <p className="text-gray-600 leading-relaxed">
              NVision Insights può trattare dati personali appartenenti a diverse categorie, in funzione delle modalità
              con cui l&apos;utente interagisce con il sito:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 leading-relaxed mt-3">
              <li>
                Dati identificativi e di contatto: nome, cognome, indirizzo email, numero di telefono
                e altre informazioni inserite volontariamente nei moduli di contatto.
              </li>
              <li>
                Dati contenuti nelle comunicazioni: oggetto della richiesta, messaggio inviato,
                preferenze espresse, eventuali informazioni professionali o aziendali comunicate dall&apos;utente.
              </li>
              <li>
                Dati tecnici di navigazione: indirizzo IP, identificativi tecnici, informazioni sul
                browser, dispositivo utilizzato, orari di accesso e dati necessari alla sicurezza del sito.
              </li>
              <li>
                Dati relativi alle preferenze: eventuale consenso alla ricezione di newsletter,
                aggiornamenti o comunicazioni informative.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">Finalità del trattamento</h2>
            <p className="text-gray-600 leading-relaxed">
              I dati personali sono trattati esclusivamente per finalità determinate, esplicite e coerenti con il rapporto
              instaurato con l&apos;utente. In particolare, possono essere utilizzati per:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 leading-relaxed mt-3">
              <li>rispondere a richieste di informazioni, preventivi, collaborazioni o approfondimenti;</li>
              <li>gestire comunicazioni relative ai contenuti editoriali e ai servizi offerti da NVision Insights;</li>
              <li>migliorare la qualità, la sicurezza, la stabilità e le prestazioni tecniche del sito;</li>
              <li>prevenire abusi, accessi non autorizzati, comportamenti anomali o attività potenzialmente dannose;</li>
              <li>inviare newsletter o aggiornamenti solo quando l&apos;utente abbia espresso un consenso valido;</li>
              <li>adempiere a eventuali obblighi previsti da norme applicabili o richieste delle autorità competenti.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">Base giuridica del trattamento</h2>
            <p className="text-gray-600 leading-relaxed">
              Il trattamento dei dati si fonda, a seconda dei casi, sull&apos;esecuzione di misure precontrattuali o
              contrattuali richieste dall&apos;utente, sul consenso espresso per attività facoltative come newsletter e
              comocazioni informative, sul legittimo interesse del titolare alla sicurezza e al corretto funzionamento
              del sito, nonché sull&apos;adempimento di obblighi di legge eventualmente applicabili.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">Modalità di trattamento, sicurezza e hosting</h2>
            <p className="text-gray-600 leading-relaxed">
              I dati sono trattati con strumenti informatici, telematici e, ove necessario, organizzativi, secondo criteri
              di proporzionalità e minimizzazione. NVision Insights adotta misure ragionevoli per ridurre il rischio di
              perdita, uso improprio, accesso non autorizzato, divulgazione o alterazione dei dati personali.
            </p>
            <p className="text-gray-600 leading-relaxed mt-3">
              Il sito web è ospitato sulla piattaforma di cloud hosting Vercel, con server situati
              all&apos;interno dello Spazio Economico Europeo (SEE).
            </p>
            <p className="text-gray-600 leading-relaxed mt-3">
              L&apos;accesso ai dati è limitato ai soggetti che ne abbiano effettiva necessità per svolgere attività
              connesse alle finalità indicate. In caso di utilizzo di fornitori tecnici o servizi esterni di gestione, 
              tali soggetti operano secondo istruzioni coerenti con la tutela dei dati.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">Conservazione dei dati</h2>
            <p className="text-gray-600 leading-relaxed">
              I dati personali sono conservati per il tempo strettamente necessario al perseguimento delle finalità per
              cui sono stati raccolti. Le richieste inviate tramite il sito possono essere conservate per il periodo utile
              alla gestione della comunicazione e di eventuali rapporti successivi. I dati trattati sulla base del consenso
              sono conservati fino alla revoca dello stesso, salvo obblighi o interessi legittimi che richiedano una
              conservazione ulteriore.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">Comunicazione e trasferimento dei dati</h2>
            <p className="text-gray-600 leading-relaxed">
              I dati personali non sono venduti né diffusi indiscriminatamente. Potranno essere comunicati a fornitori
              tecnici, consulenti, servizi di hosting, piattaforme di gestione email o altri soggetti necessari al
              funzionamento del sito e alla gestione delle comunicazioni. Eventuali trasferimenti verso paesi esterni
              allo Spazio Economico Europeo saranno effettuati solo in presenza di adeguate garanzie giuridiche.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">Diritti dell&apos;utente e Diritto di Reclamo</h2>
            <p className="text-gray-600 leading-relaxed">
              L&apos;utente può esercitare, nei limiti previsti dalla normativa applicabile, i diritti di accesso, rettifica,
              cancellazione, limitazione, opposizione al trattamento e portabilità dei dati. Può inoltre revocare il
              consenso eventualmente prestato, senza pregiudicare la liceità del trattamento svolto prima della revoca.
            </p>
            <p className="text-gray-600 leading-relaxed mt-3">
              Si informa l&apos;utente che ha altresì il diritto di proporre reclamo all&apos;autorità di controllo competente 
              qualora ritenga che il trattamento violi i propri diritti; in Italia tale autorità è il 
              Garante per la protezione dei dati personali (<a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer" className="text-purple-600 underline">www.garanteprivacy.it</a>).
            </p>
            <p className="text-gray-600 leading-relaxed mt-3">
              Per esercitare tali diritti è possibile scrivere a
              <a href="mailto:info.nvisioninsights@gmail.com" className="text-purple-600 underline ml-1">
                info.nvisioninsights@gmail.com
              </a>.
              Le richieste saranno valutate con attenzione e riscontrate entro tempi ragionevoli.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">Aggiornamenti della presente informativa</h2>
            <p className="text-gray-600 leading-relaxed">
              La presente Privacy Policy potrà essere aggiornata per riflettere modifiche normative, tecniche o
              organizzative. La versione più recente sarà sempre disponibile su questa pagina. Si invita pertanto
              l&apos;utente a consultarla periodicamente.
            </p>
          </section>

          {/* Bottone Home corretto semanticamente ed animato */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="h-fit w-fit"
            >
              <Link 
                href="/" 
                className="bg-black text-white px-12 py-4 rounded-full font-bold hover:bg-purple-500 hover:text-white transition-all duration-300 flex items-center"
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