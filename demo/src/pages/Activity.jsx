import { useState } from 'react';
import { agents, activityLog } from '../data/agents';

const STATUS_BADGE = {
  qualified: 'bg-secondary/10 text-secondary',
  sent: 'bg-secondary/10 text-secondary',
  refused: 'bg-error-container text-error',
  incomplete: 'bg-tertiary-fixed-dim/40 text-on-tertiary-fixed-variant',
};

function AgentStatusPill({ status, label }) {
  if (status === 'online') {
    return (
      <div className="flex items-center gap-2 bg-secondary/10 px-2.5 py-1 rounded-full border border-secondary/20">
        <span className="w-2 h-2 rounded-full bg-secondary" />
        <span className="text-[10px] font-bold text-secondary uppercase tracking-wider">{label}</span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2 bg-surface-container-highest px-2.5 py-1 rounded-full border border-outline-variant/20">
      <span className="w-2 h-2 rounded-full bg-on-primary-container" />
      <span className="text-[10px] font-bold text-on-primary-container uppercase tracking-wider">{label}</span>
    </div>
  );
}

function AgentCard({ agent }) {
  const [configured, setConfigured] = useState(false);
  const isDraft = agent.status === 'draft';

  return (
    <div className="col-span-12 lg:col-span-4 flex flex-col">
      <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant/5 flex flex-col h-full relative overflow-hidden group">
        {/* Decorative circle */}
        <div
          className={`absolute top-0 right-0 w-32 h-32 rounded-bl-full -mr-10 -mt-10 group-hover:scale-110 transition-transform ${
            isDraft ? 'bg-on-primary-container/5' : 'bg-secondary/5'
          }`}
        />

        {/* Header */}
        <div className="flex justify-between items-start mb-6 relative">
          <div
            className={`w-12 h-12 bg-surface-container-high rounded-lg flex items-center justify-center ${
              isDraft ? 'text-on-primary-container' : 'text-secondary'
            }`}
          >
            <span className="material-symbols-outlined text-2xl">{agent.icon}</span>
          </div>
          <AgentStatusPill status={agent.status} label={agent.statusLabel} />
        </div>

        <h3 className="text-xl font-bold font-headline mb-1">{agent.name}</h3>
        <p className="text-xs text-on-surface-variant mb-6">{agent.description}</p>

        {/* Params */}
        <div className="space-y-4 mb-8">
          {agent.params.map((p) => (
            <div key={p.label} className="flex justify-between items-center text-sm">
              <span className="text-on-surface-variant flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">{p.icon}</span>
                {p.label}
              </span>
              <span className="font-semibold text-primary-container">{p.value}</span>
            </div>
          ))}
          <div className="w-full bg-surface-container-low rounded-full h-1.5 mt-2">
            <div
              className={`h-1.5 rounded-full ${agent.progressColor}`}
              style={{ width: agent.progressWidth }}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="mt-auto grid grid-cols-2 gap-4 pt-6 border-t border-outline-variant/10">
          {agent.stats.map((s) => (
            <div key={s.label}>
              <p className="text-[10px] uppercase font-bold tracking-widest text-on-primary-container mb-1">
                {s.label}
              </p>
              <p
                className={`text-2xl font-extrabold font-headline ${
                  s.highlight && !isDraft ? 'text-secondary' : 'text-on-primary-container'
                }`}
              >
                {s.value}
              </p>
            </div>
          ))}
        </div>

        {/* Button */}
        <button
          onClick={() => setConfigured((v) => !v)}
          className={`w-full mt-6 py-3 font-bold text-sm rounded-lg transition-colors ${
            isDraft
              ? 'bg-primary-container text-white hover:opacity-95'
              : configured
              ? 'bg-secondary text-on-secondary hover:opacity-90'
              : 'bg-surface-container-high text-on-surface hover:bg-surface-dim'
          }`}
        >
          {configured ? 'Configuré ✓' : 'Configurer'}
        </button>
      </div>
    </div>
  );
}

export default function Activity() {
  return (
    <>
      {/* Page header */}
      <div className="mb-10 flex justify-between items-end">
        <div>
          <nav className="flex items-center gap-2 text-xs text-on-primary-container mb-2 font-medium uppercase tracking-widest">
            <span>Paramètres</span>
            <span className="material-symbols-outlined text-[10px]">chevron_right</span>
            <span className="text-secondary">Intelligence Artificielle</span>
          </nav>
          <h2 className="text-4xl font-extrabold font-headline tracking-tight text-primary-container">
            Configuration des Agents
          </h2>
          <p className="text-on-surface-variant mt-2 max-w-xl">
            Pilotez vos agents IA autonomes. Ajustez leur tempérament, leurs seuils de décision
            et suivez leur performance opérationnelle en temps réel.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 rounded-lg border border-outline-variant/30 text-sm font-semibold hover:bg-surface-container transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">sync</span>
            Actualiser
          </button>
          <button className="px-5 py-2.5 bg-primary-container text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">rocket_launch</span>
            Déployer tout
          </button>
        </div>
      </div>

      {/* Bento grid */}
      <div className="grid grid-cols-12 gap-6">
        {agents.map((agent) => (
          <AgentCard key={agent.id} agent={agent} />
        ))}

        {/* Activity log */}
        <div className="col-span-12">
          <div className="bg-white rounded-xl shadow-[0_0_32px_0_rgba(13,28,46,0.03)] overflow-hidden">
            <div className="p-6 border-b border-outline-variant/10 flex justify-between items-center bg-surface-container-lowest">
              <h4 className="font-bold text-lg font-headline flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">bolt</span>
                Journal d'Activité Réel
              </h4>
              <span className="text-xs font-semibold text-on-surface-variant bg-surface-container-low px-3 py-1 rounded-full">
                Dernière heure
              </span>
            </div>

            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low/50">
                  {['Heure', 'Agent', 'Action', 'Lead', 'Statut IA'].map((col) => (
                    <th
                      key={col}
                      className="px-6 py-4 text-[10px] uppercase font-bold tracking-widest text-on-primary-container"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {activityLog.map((row) => (
                  <tr key={row.id} className="hover:bg-surface-container-low transition-colors">
                    <td className="px-6 py-4 text-xs font-medium text-on-surface-variant">
                      {row.time}
                    </td>
                    <td className="px-6 py-4 text-xs font-bold text-primary-container">
                      {row.agent}
                    </td>
                    <td className="px-6 py-4 text-xs">{row.action}</td>
                    <td className="px-6 py-4 text-xs">{row.lead}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          STATUS_BADGE[row.status] ?? STATUS_BADGE.qualified
                        }`}
                      >
                        {row.statusLabel}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
