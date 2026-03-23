import { stats, priorityLeads, activityFeed } from '../data/leads';

function StatCard({ label, value, badge, badgeColor, highlight }) {
  if (highlight) {
    return (
      <div className="bg-secondary p-6 rounded-xl shadow-lg text-on-secondary">
        <p className="text-xs font-semibold opacity-80 uppercase tracking-wider mb-2 font-label">{label}</p>
        <div className="flex items-end gap-3">
          <h2 className="text-4xl font-extrabold font-headline">{value}</h2>
          <span className="material-symbols-outlined opacity-60">trending_up</span>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm group hover:bg-surface-container-low transition-all">
      <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2 font-label">{label}</p>
      <div className="flex items-end gap-3">
        <h2 className="text-4xl font-extrabold font-headline text-on-surface">{value}</h2>
        <span className={`font-bold text-sm mb-1 ${badgeColor}`}>{badge}</span>
      </div>
    </div>
  );
}

function LeadItem({ lead }) {
  return (
    <div className="flex items-center justify-between p-4 hover:bg-surface-container-low rounded-lg transition-colors group">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center font-bold text-secondary font-headline text-sm">
          {lead.initials}
        </div>
        <div>
          <h4 className="text-sm font-bold text-on-surface">{lead.name}</h4>
          <p className="text-xs text-on-surface-variant">
            {lead.service} • {lead.amount.toLocaleString('fr-FR')}€ est.
          </p>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <StatusBadge status={lead.statusColor} label={lead.status} />
        <button className="opacity-0 group-hover:opacity-100 bg-secondary text-on-secondary text-xs px-4 py-1.5 rounded-md font-bold transition-all">
          Examiner
        </button>
      </div>
    </div>
  );
}

function StatusBadge({ status, label }) {
  const styles = {
    qualified: 'bg-secondary-container text-on-secondary-container',
    review: 'bg-tertiary-fixed text-on-tertiary-fixed-variant',
    incomplete: 'bg-error-container text-on-error-container',
  };
  return (
    <span className={`px-3 py-1 text-[10px] font-bold rounded-full uppercase ${styles[status] || styles.qualified}`}>
      {label}
    </span>
  );
}

function ActivityItem({ item }) {
  return (
    <div className="relative flex items-start gap-4">
      <div
        className={`absolute left-0 mt-1 flex h-2 w-2 items-center justify-center rounded-full ml-[13px] ring-4 ring-white ${
          item.active ? 'bg-secondary' : 'bg-outline-variant'
        }`}
      />
      <div className="ml-8">
        <p className="text-sm text-on-surface font-medium leading-relaxed">
          {item.text} <span className="font-bold">{item.boldName}</span> {item.textAfter}
        </p>
        <span className="text-[10px] font-bold text-on-surface-variant uppercase mt-1 block">{item.time}</span>
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <>
      {/* Global Stats */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <StatCard
          label="Total Leads gérés par l'IA"
          value={stats.totalLeads.toLocaleString('fr-FR')}
          badge={stats.totalLeadsGrowth}
          badgeColor="text-secondary"
        />
        <StatCard
          label="Devis en attente de validation"
          value={stats.pendingQuotes}
          badge={stats.pendingQuotesLabel}
          badgeColor="text-tertiary-fixed-dim"
        />
        <StatCard
          label="Taux de conversion (L→S)"
          value={stats.conversionRate}
          badge={stats.conversionGrowth}
          badgeColor="text-secondary"
        />
        <StatCard
          label="Chiffre d'affaires en cours"
          value={stats.revenue}
          highlight
        />
      </section>

      {/* Bento Layout */}
      <div className="grid grid-cols-12 gap-8">
        {/* Left Column */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-8">
          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Bar Chart */}
            <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-headline font-bold text-on-surface">Tendances du volume de devis</h3>
                <span className="material-symbols-outlined text-on-surface-variant">more_horiz</span>
              </div>
              <div className="h-48 flex items-end justify-between gap-2 px-2">
                {[40, 60, 85, 45, 70, 95, 55].map((h, i) => (
                  <div
                    key={i}
                    className={`w-full rounded-t-sm ${i === 2 || i === 5 ? 'bg-secondary' : 'bg-surface-container-high'}`}
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-4 px-2 text-[10px] font-bold text-on-surface-variant uppercase">
                {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((d) => (
                  <span key={d}>{d}</span>
                ))}
              </div>
            </div>

            {/* Donut Chart */}
            <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm relative overflow-hidden">
              <h3 className="font-headline font-bold text-on-surface mb-6">Répartition du tri des leads</h3>
              <div className="flex items-center gap-8">
                <div className="relative w-32 h-32 rounded-full border-[12px] border-secondary border-r-surface-container-high border-b-tertiary-fixed-dim flex-shrink-0">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-bold text-on-surface">1.2k</span>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  {[
                    { color: 'bg-secondary', label: 'Qualifié (65%)' },
                    { color: 'bg-tertiary-fixed-dim', label: 'Incomplet (20%)' },
                    { color: 'bg-surface-container-high', label: 'Hors champ (15%)' },
                  ].map(({ color, label }) => (
                    <div key={label} className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${color}`} />
                      <span className="text-xs font-medium text-on-surface-variant">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Priority Leads */}
          <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 flex justify-between items-center bg-white">
              <h3 className="font-headline font-bold text-on-surface">Leads prioritaires</h3>
              <button className="text-secondary text-sm font-bold flex items-center gap-1 hover:underline">
                Voir tout <span className="material-symbols-outlined text-sm">chevron_right</span>
              </button>
            </div>
            <div className="px-6 pb-6">
              <div className="space-y-1">
                {priorityLeads.map((lead) => (
                  <LeadItem key={lead.id} lead={lead} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Activity Feed */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm h-full">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-headline font-bold text-on-surface">Activité de l'agent IA</h3>
              <span className="material-symbols-outlined text-secondary animate-pulse">smart_toy</span>
            </div>
            <div className="relative space-y-8 before:absolute before:inset-0 before:ml-4 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-secondary before:via-outline-variant before:to-transparent">
              {activityFeed.map((item) => (
                <ActivityItem key={item.id} item={item} />
              ))}
            </div>
            <button className="w-full mt-10 py-3 border border-outline-variant/30 text-on-surface-variant text-xs font-bold rounded-lg hover:bg-surface-container-low transition-colors uppercase tracking-widest">
              Journal d'activité complet
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 flex items-center justify-between p-6 bg-surface-container-low rounded-xl">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-secondary inline-block" />
            <span className="text-xs font-bold text-on-surface font-label">Moteur IA : Opérationnel</span>
          </div>
          <div className="h-4 w-px bg-outline-variant/30" />
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-sm text-on-surface-variant">terminal</span>
            <span className="text-xs font-medium text-on-surface-variant">Dernière synchro système : il y a 32s</span>
          </div>
        </div>
        <div className="text-[10px] text-on-surface-variant uppercase font-bold tracking-tighter">
          Leadger Engine v4.2.0 • Enterprise Core
        </div>
      </footer>
    </>
  );
}
