import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { quotes } from '../data/quotes';

const quote = quotes[0];

/* ── Timeline event ─────────────────────────────────────── */
function TimelineEvent({ event }) {
  if (event.type === 'quote') {
    return (
      <div className="relative flex gap-6">
        <div className="relative z-10 w-8 h-8 rounded-full bg-secondary flex items-center justify-center border-4 border-white flex-shrink-0">
          <span className="material-symbols-outlined text-white text-sm">description</span>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm font-bold text-secondary">{event.label}</p>
            <span className="text-[10px] text-on-surface-variant">{event.time}</span>
          </div>
          <div className="p-4 bg-secondary-container/10 rounded-xl rounded-tl-none border-l-2 border-secondary">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold">{event.draftLabel}</p>
              <span className="px-2 py-0.5 bg-tertiary-container text-white text-[9px] font-bold rounded">
                En attente d'approbation
              </span>
            </div>
            <p className="text-[11px] mt-2 opacity-80">{event.draftNote}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex gap-6">
      <div
        className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center border-4 border-white flex-shrink-0 ${
          event.isAgent ? 'bg-secondary' : 'bg-surface-container-highest'
        }`}
      >
        <span
          className={`material-symbols-outlined text-sm ${event.isAgent ? 'text-white' : ''}`}
        >
          {event.icon}
        </span>
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <p className={`text-sm font-bold ${event.isAgent ? 'text-secondary' : ''}`}>
            {event.label}
          </p>
          <span className="text-[10px] text-on-surface-variant">{event.time}</span>
        </div>
        <div
          className={`p-4 rounded-xl rounded-tl-none ${
            event.isAgent
              ? 'bg-secondary-container/10 border-l-2 border-secondary'
              : 'bg-surface-container-low'
          }`}
        >
          <p className={`text-xs leading-relaxed ${event.isAgent ? 'italic' : ''}`}>
            {event.message}
          </p>
          {event.tags.length > 0 && (
            <div className="flex gap-2 mt-2">
              {event.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 bg-secondary/10 text-[9px] font-bold text-secondary rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Main page ───────────────────────────────────────────── */
export default function QuoteDetail() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState(quote.timeline);
  const [input, setInput] = useState('');
  const [approved, setApproved] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  function handleSend() {
    const text = input.trim();
    if (!text) return;
    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        type: 'reply',
        icon: 'person',
        label: 'Vous',
        time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        isAgent: false,
        message: text,
        tags: [],
      },
    ]);
    setInput('');
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleSend();
  }

  return (
    <div className="max-w-[1600px] mx-auto">
      {/* Page header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <button
            onClick={() => navigate('/devis')}
            className="text-xs font-bold text-secondary uppercase tracking-widest flex items-center gap-1 mb-1 hover:underline"
          >
            <span className="material-symbols-outlined text-xs">arrow_back</span>
            Retour aux devis
          </button>
          <h2 className="text-4xl font-extrabold font-headline text-on-surface tracking-tight">
            {quote.clientName}
          </h2>
        </div>
        <div className="px-4 py-2 bg-secondary-container/30 rounded-lg flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-secondary" />
          <span className="text-xs font-bold text-on-secondary-container">
            Statut : {quote.statusLabel}
          </span>
        </div>
      </div>

      {/* Three-column layout */}
      <div className="grid grid-cols-12 gap-6 items-start">
        {/* ── Left: lead info ── */}
        <section className="col-span-3 flex flex-col gap-6">
          {/* Contact card */}
          <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-4">
              Coordonnées
            </h3>
            <div className="space-y-4">
              {[
                { icon: 'person', label: 'Nom du contact', value: quote.contact },
                { icon: 'mail', label: 'E-mail', value: quote.email },
                { icon: 'location_on', label: 'Localisation', value: quote.location },
              ].map(({ icon, label, value }) => (
                <div key={label} className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-secondary">{icon}</span>
                  <div>
                    <p className="text-xs text-on-surface-variant">{label}</p>
                    <p className="text-sm font-semibold">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Request summary */}
          <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-4">
              Résumé de la demande
            </h3>
            <div className="p-4 bg-surface-container-low rounded-lg mb-4">
              <p className="text-sm font-medium leading-relaxed">"{quote.requestSummary}"</p>
            </div>
            <div className="flex items-center justify-between p-4 bg-secondary-container/10 rounded-lg">
              <div>
                <p className="text-[10px] font-bold text-on-secondary-container uppercase">
                  Valeur prédite par l'IA
                </p>
                <p className="text-2xl font-extrabold font-headline text-secondary">
                  {quote.aiPredictedValue.toLocaleString('fr-FR')}€
                </p>
              </div>
              <span className="material-symbols-outlined text-secondary-fixed-dim text-4xl">
                trending_up
              </span>
            </div>
          </div>

          {/* Map placeholder */}
          <div className="relative overflow-hidden rounded-xl h-48 bg-surface-container-high flex items-end">
            <div className="absolute inset-0 grid grid-cols-8 grid-rows-6 opacity-10">
              {Array.from({ length: 48 }).map((_, i) => (
                <div key={i} className="border border-on-surface/20" />
              ))}
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-secondary ring-4 ring-secondary/20" />
            </div>
            <div className="relative z-10 w-full bg-gradient-to-t from-primary/60 to-transparent flex items-end p-4 h-24">
              <div className="flex items-center gap-2 text-white">
                <span className="material-symbols-outlined text-sm">pin_drop</span>
                <span className="text-xs font-bold">{quote.address}</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Center: timeline ── */}
        <section className="col-span-5">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col h-[700px]">
            <div className="p-6 bg-surface-container-low/50 flex items-center justify-between flex-shrink-0">
              <h3 className="font-bold font-headline">Historique d'activité de l'agent</h3>
              <span className="text-[10px] font-bold bg-tertiary-fixed-dim text-on-tertiary-fixed-variant px-2 py-1 rounded">
                Flux Direct
              </span>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-8 relative">
              <div className="absolute left-10 top-8 bottom-8 w-px bg-outline-variant opacity-30" />
              {messages.map((event) => (
                <TimelineEvent key={event.id} event={event} />
              ))}
            </div>

            <div className="p-4 bg-surface-container-lowest flex-shrink-0">
              <div className="flex gap-2">
                <input
                  className="flex-1 bg-surface-container-low border-none outline-none rounded-lg text-sm px-4 py-3"
                  placeholder="Écrivez un message pour prendre la main sur l'IA..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <button
                  onClick={handleSend}
                  className="p-3 bg-secondary text-on-secondary rounded-lg hover:opacity-90 transition-opacity"
                >
                  <span className="material-symbols-outlined">send</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── Right: quote preview ── */}
        <section className="col-span-4 flex flex-col gap-6">
          <div className="bg-surface-container-lowest rounded-xl shadow-[0_0_32px_0_rgba(13,28,46,0.06)] overflow-hidden">
            {/* Dark header */}
            <div className="p-6 bg-[#1a2b42] text-white">
              <div className="flex justify-between items-start mb-6">
                <h3 className="font-headline text-lg font-bold">Aperçu du devis</h3>
                <span className="text-[10px] font-bold tracking-widest uppercase opacity-60">
                  Brouillon #{quote.id}
                </span>
              </div>
              <div className="space-y-1">
                <p className="text-xs opacity-70">Total proposé</p>
                <p className="text-4xl font-extrabold font-headline">
                  {quote.total.toLocaleString('fr-FR')}€
                </p>
              </div>
            </div>

            {/* Line items */}
            <div className="p-8 space-y-6">
              <div className="space-y-4">
                {quote.lineItems.map((item) => (
                  <div key={item.label} className="flex justify-between items-center text-xs">
                    <span className="text-on-surface-variant font-medium">{item.label}</span>
                    <span className="font-bold">{item.amount.toLocaleString('fr-FR')}€</span>
                  </div>
                ))}
              </div>

              <div className="h-px bg-outline-variant opacity-10" />

              <div className="space-y-3">
                <h4 className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
                  Conditions de service incluses
                </h4>
                <ul className="space-y-2">
                  {quote.serviceConditions.map((cond) => (
                    <li key={cond} className="flex items-center gap-2 text-[11px] font-medium">
                      <span className="material-symbols-outlined text-secondary text-xs">
                        check_circle
                      </span>
                      {cond}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action buttons */}
            <div className="p-6 bg-surface-container-low flex flex-col gap-3">
              {approved ? (
                <div className="w-full py-4 bg-secondary-container text-on-secondary-container rounded-xl font-bold text-sm flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined">check_circle</span>
                  Devis approuvé et envoyé !
                </div>
              ) : (
                <button
                  onClick={() => setApproved(true)}
                  className="w-full py-4 bg-secondary text-on-secondary rounded-xl font-bold font-headline text-sm flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-lg shadow-secondary/20"
                >
                  <span className="material-symbols-outlined">check_circle</span>
                  Approuver &amp; Envoyer le devis
                </button>
              )}
              <button className="w-full py-3 bg-white border border-outline-variant/30 text-on-surface rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-surface-container-lowest transition-colors">
                <span className="material-symbols-outlined text-sm">edit</span>
                Modifier les détails
              </button>
            </div>
          </div>

          {/* AI analysis note */}
          <div className="p-6 bg-tertiary-container text-white rounded-xl">
            <div className="flex items-center gap-3 mb-3">
              <span className="material-symbols-outlined text-tertiary-fixed-dim">verified</span>
              <h4 className="text-sm font-bold">Analyse de l'IA</h4>
            </div>
            <p className="text-xs opacity-80 leading-relaxed mb-4">"{quote.aiAnalysis}"</p>
            <button className="text-[10px] font-bold text-tertiary-fixed-dim uppercase tracking-widest hover:underline">
              Voir les disponibilités
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
