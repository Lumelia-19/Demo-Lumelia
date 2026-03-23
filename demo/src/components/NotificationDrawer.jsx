export default function NotificationDrawer({ isOpen, onClose }) {
  return (
    <div
      className={`fixed right-0 top-0 h-full w-80 bg-white shadow-[0_0_32px_0_rgba(13,28,46,0.06)] z-[60] transition-transform duration-300 ease-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-lg font-bold font-headline text-on-surface">Centre de notifications</h2>
            <button
              className="material-symbols-outlined text-on-surface-variant hover:text-on-surface transition-colors"
              onClick={onClose}
            >
              close
            </button>
          </div>
          <p className="text-xs text-on-surface-variant font-inter">Insights IA en temps réel</p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="p-3 bg-surface-container-low rounded-lg">
            <div className="flex gap-2 items-center mb-1">
              <span className="material-symbols-outlined text-secondary text-sm">smart_toy</span>
              <span className="text-[10px] font-bold uppercase text-secondary">Alerte IA</span>
            </div>
            <p className="text-xs font-medium text-on-surface">
              Nouveau lead à haute valeur détecté en région parisienne (150k€+)
            </p>
          </div>

          <div className="p-3 bg-surface-container-low rounded-lg">
            <div className="flex gap-2 items-center mb-1">
              <span className="material-symbols-outlined text-secondary text-sm">smart_toy</span>
              <span className="text-[10px] font-bold uppercase text-secondary">Alerte IA</span>
            </div>
            <p className="text-xs font-medium text-on-surface">
              Devis Boulangerie Dupont (450€) prêt pour validation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
