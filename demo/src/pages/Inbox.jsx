import { useState } from 'react';
import { inboxLeads } from '../data/leads';

const TABS = [
  { key: 'en-cours', label: 'En cours de tri', count: 12, countStyle: 'bg-secondary-container text-on-secondary-container' },
  { key: 'incomplet', label: 'Incomplet', count: 4, countStyle: 'bg-tertiary-fixed-dim/20 text-on-tertiary-fixed-variant' },
  { key: 'qualifié', label: 'Qualifié', count: 28, countStyle: 'bg-secondary-container/30 text-secondary' },
  { key: 'hors-périmètre', label: 'Hors périmètre', count: null, countStyle: '' },
];

const STATUS_CONFIG = {
  active: {
    badge: (
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
        <span className="text-xs font-bold text-secondary">IA en attente</span>
        <span className="material-symbols-outlined text-[14px] text-secondary opacity-60">smart_toy</span>
      </div>
    ),
    rowBg: 'bg-secondary-container/[0.03]',
    actions: (
      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="p-2 hover:bg-white rounded-lg transition-colors text-on-surface-variant">
          <span className="material-symbols-outlined text-[18px]">visibility</span>
        </button>
        <button className="bg-secondary text-on-secondary px-3 py-1.5 rounded-lg text-[11px] font-bold">
          Forcer le Devis
        </button>
      </div>
    ),
  },
  incomplete: {
    badge: (
      <span className="px-2.5 py-1 rounded-full bg-tertiary-fixed-dim/40 text-on-tertiary-fixed-variant text-[10px] font-bold">
        Incomplet
      </span>
    ),
    rowBg: '',
    actions: (
      <div className="flex items-center justify-end gap-2">
        <button className="p-2 hover:bg-surface-container-high rounded-lg transition-colors text-on-surface-variant">
          <span className="material-symbols-outlined text-[18px]">visibility</span>
        </button>
        <button className="bg-outline text-on-secondary px-3 py-1.5 rounded-lg text-[11px] font-bold">
          Examiner
        </button>
      </div>
    ),
  },
  qualified: {
    badge: (
      <span className="px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container text-[10px] font-bold">
        Qualifié
      </span>
    ),
    rowBg: '',
    actions: (
      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="p-2 hover:bg-white rounded-lg transition-colors text-on-surface-variant">
          <span className="material-symbols-outlined text-[18px]">visibility</span>
        </button>
        <button className="bg-secondary text-on-secondary px-3 py-1.5 rounded-lg text-[11px] font-bold">
          Générer PDF
        </button>
      </div>
    ),
  },
  'out-of-scope': {
    badge: (
      <span className="px-2.5 py-1 rounded-full bg-error-container text-on-error-container text-[10px] font-bold">
        Hors périmètre
      </span>
    ),
    rowBg: 'opacity-70',
    actions: (
      <span className="text-xs font-medium text-on-surface-variant">Refus automatique envoyé</span>
    ),
  },
};

const INITIALS_STYLE = {
  active: 'bg-surface-container text-secondary',
  incomplete: 'bg-tertiary-fixed-dim/30 text-on-tertiary-fixed-variant',
  qualified: 'bg-surface-container text-on-surface',
  'out-of-scope': 'bg-error-container/40 text-error',
};

function LeadRow({ lead }) {
  const config = STATUS_CONFIG[lead.status];
  return (
    <tr className={`group hover:bg-surface-container-low transition-colors ${config.rowBg}`}>
      <td className="px-6 py-5">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs ${INITIALS_STYLE[lead.status]}`}>
            {lead.initials}
          </div>
          <div>
            <p className="text-sm font-bold">{lead.name}</p>
            <p className="text-[11px] text-on-surface-variant">{lead.email}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-5">
        <p className="text-sm font-semibold">{lead.service}</p>
        {lead.serviceDetail && (
          <p className="text-[11px] text-on-surface-variant italic">{lead.serviceDetail}</p>
        )}
      </td>
      <td className="px-6 py-5">{config.badge}</td>
      <td className="px-6 py-5 text-sm font-medium">{lead.waitTime}</td>
      <td className="px-6 py-5 text-right font-headline font-bold text-sm">
        {lead.amount ? `${lead.amount.toLocaleString('fr-FR')}€` : '--'}
      </td>
      <td className="px-6 py-5 text-right">{config.actions}</td>
    </tr>
  );
}

export default function Inbox() {
  const [activeTab, setActiveTab] = useState('en-cours');
  const [page, setPage] = useState(1);

  const filtered = inboxLeads.filter((l) => l.tab === activeTab);

  return (
    <>
      {/* Hero Header */}
      <div className="flex items-end justify-between mb-10">
        <div>
          <h2 className="text-4xl font-extrabold font-headline tracking-tight text-on-surface">
            Tri des Leads
          </h2>
          <p className="text-on-surface-variant mt-2 font-medium">
            L'agent IA traite <span className="text-secondary">14 nouveaux arrivages</span>
          </p>
        </div>
        <div className="flex gap-8">
          <div className="text-right">
            <p className="text-[10px] uppercase font-bold tracking-widest text-on-surface-variant opacity-60">
              TEMPS MOYEN DE TRI
            </p>
            <p className="text-3xl font-bold font-headline">
              4.2<span className="text-sm font-medium ml-1">min</span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase font-bold tracking-widest text-on-surface-variant opacity-60">
              TAUX DE RÉUSSITE
            </p>
            <p className="text-3xl font-bold font-headline text-secondary">98.4%</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-surface-container-low p-1 rounded-xl flex items-center gap-1 mb-6 w-fit">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => { setActiveTab(tab.key); setPage(1); }}
            className={`px-6 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors ${
              activeTab === tab.key
                ? 'bg-white shadow-sm font-bold text-secondary'
                : 'hover:bg-surface-container-high text-on-surface-variant'
            }`}
          >
            {tab.label}
            {tab.count !== null && (
              <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${tab.countStyle}`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_0_32px_0_rgba(13,28,46,0.03)] border border-outline-variant/10">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low/50">
              {['CLIENT', 'SERVICE DEMANDÉ', 'STATUT IA', "TEMPS D'ATTENTE", 'VALEUR EST.', 'ACTIONS'].map(
                (col, i) => (
                  <th
                    key={col}
                    className={`px-6 py-4 text-[10px] uppercase font-bold tracking-widest text-on-surface-variant opacity-70 ${
                      i >= 4 ? 'text-right' : ''
                    }`}
                  >
                    {col}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/5">
            {filtered.length > 0 ? (
              filtered.map((lead) => <LeadRow key={lead.id} lead={lead} />)
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-on-surface-variant text-sm">
                  Aucun lead dans cette catégorie.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="px-6 py-4 bg-surface-container-low/30 border-t border-outline-variant/5 flex justify-between items-center">
          <p className="text-xs text-on-surface-variant">
            Affichage de 1-{filtered.length} sur 54 entrées actives
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="p-2 hover:bg-surface-container-high rounded-lg transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            </button>
            {[1, 2, 3].map((n) => (
              <button
                key={n}
                onClick={() => setPage(n)}
                className={`p-2 rounded-lg transition-colors font-bold text-xs px-4 ${
                  page === n ? 'bg-secondary text-on-secondary' : 'hover:bg-surface-container-high'
                }`}
              >
                {n}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(3, p + 1))}
              className="p-2 hover:bg-surface-container-high rounded-lg transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* Insight Panel */}
      <div className="mt-12 grid grid-cols-3 gap-8">
        {/* AI Efficiency */}
        <div className="col-span-2 bg-surface-container-low p-8 rounded-2xl relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="font-headline font-bold text-xl mb-4">Efficacité du tri par IA</h3>
            <div className="flex items-center gap-12">
              <div>
                <p className="text-[10px] uppercase font-bold tracking-widest text-on-surface-variant opacity-60">
                  AUTO-RÉSOLU
                </p>
                <p className="text-2xl font-bold font-headline">84%</p>
                <div className="w-32 h-1 bg-outline-variant/20 rounded-full mt-2 overflow-hidden">
                  <div className="bg-secondary h-full w-[84%]" />
                </div>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold tracking-widest text-on-surface-variant opacity-60">
                  RÉVISION HUMAINE
                </p>
                <p className="text-2xl font-bold font-headline">16%</p>
                <div className="w-32 h-1 bg-outline-variant/20 rounded-full mt-2 overflow-hidden">
                  <div className="bg-tertiary-fixed-dim h-full w-[16%]" />
                </div>
              </div>
              <div className="ml-auto">
                <button className="flex items-center gap-2 text-xs font-bold text-secondary hover:underline underline-offset-4">
                  Voir les logs de logique
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
          <div className="absolute -right-8 -bottom-8 opacity-5">
            <span className="material-symbols-outlined text-[200px]">psychology</span>
          </div>
        </div>

        {/* Pipeline Value */}
        <div className="bg-primary-container text-white p-8 rounded-2xl flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-on-secondary">trending_up</span>
            </div>
            <h3 className="font-headline font-bold text-xl leading-tight">
              Valeur prévisionnelle du pipeline
            </h3>
            <p className="text-on-primary-container mt-2 text-sm">
              Revenu potentiel des leads qualifiés actuellement en cours de tri.
            </p>
          </div>
          <div className="mt-8">
            <p className="text-3xl font-bold font-headline text-secondary-container">284.5k€</p>
            <p className="text-[10px] text-on-primary-container uppercase tracking-wider font-bold mt-1">
              +12% PAR RAPPORT À LA SEMAINE DERNIÈRE
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
