import { NavLink } from 'react-router-dom';

const navItems = [
  { icon: 'dashboard', label: 'Tableau de bord', to: '/' },
  { icon: 'inbox', label: 'Boîte de réception', to: '/inbox' },
  { icon: 'request_quote', label: 'Devis', to: '/devis' },
  { icon: 'insights', label: 'Activité', to: '/activite' },
  { icon: 'settings', label: 'Paramètres', to: '/parametres' },
];

export default function Sidebar() {
  return (
    <aside className="h-screen w-64 fixed left-0 top-0 bg-slate-50 flex flex-col p-4 gap-2 z-50">
      <div className="mb-8 px-4">
        <h1 className="text-xl font-bold text-[#0D1C2E] tracking-tight font-headline">Leadger</h1>
        <p className="text-xs text-on-surface-variant font-medium">Le Cockpit (Tableau de bord)</p>
      </div>

      <nav className="flex-1 flex flex-col gap-1">
        {navItems.map(({ icon, label, to }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              isActive
                ? 'flex items-center gap-3 px-4 py-3 text-[#006C49] bg-white rounded-lg font-bold scale-95 transition-transform duration-150'
                : 'flex items-center gap-3 px-4 py-3 text-[#44474D] hover:bg-[#eff4ff] rounded-lg transition-colors'
            }
          >
            <span className="material-symbols-outlined">{icon}</span>
            <span className="font-manrope text-sm font-medium">{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto p-4 bg-surface-container-low rounded-xl">
        <button className="w-full bg-secondary text-on-secondary py-2.5 rounded-lg font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-all">
          <span className="material-symbols-outlined text-sm">add</span>
          Nouveau Devis
        </button>
      </div>
    </aside>
  );
}
