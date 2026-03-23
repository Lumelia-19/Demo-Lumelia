import { useState } from 'react';

export default function Header({ onNotificationClick }) {
  const [search, setSearch] = useState('');

  return (
    <header className="fixed top-0 right-0 w-[calc(100%-16rem)] h-16 bg-white/80 backdrop-blur-md flex justify-between items-center px-8 z-40">
      <div className="flex items-center bg-surface-container-low px-4 py-1.5 rounded-full w-96">
        <span className="material-symbols-outlined text-on-surface-variant text-lg">search</span>
        <input
          className="bg-transparent border-none outline-none text-sm w-full font-inter ml-2"
          placeholder="Rechercher des leads, devis ou analyses..."
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4 text-on-surface-variant">
          <button
            className="hover:text-[#006C49] transition-colors"
            onClick={onNotificationClick}
          >
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button className="hover:text-[#006C49] transition-colors">
            <span className="material-symbols-outlined">history</span>
          </button>
          <button className="hover:text-[#006C49] transition-colors">
            <span className="material-symbols-outlined">help</span>
          </button>
        </div>

        <div className="h-8 w-px bg-outline-variant/30"></div>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-on-secondary text-xs font-bold font-headline">
            CF
          </div>
          <span className="text-sm font-semibold text-on-surface font-inter">Console Fondateur</span>
        </div>
      </div>
    </header>
  );
}
