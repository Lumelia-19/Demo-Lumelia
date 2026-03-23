import { useState } from 'react';
import {
  companyProfile,
  quoteConfig,
  notificationChannels,
  teamMembers,
  sectors,
  currencies,
  pdfTemplates,
} from '../data/settings';

/* ── Toggle switch ──────────────────────────────────────── */
function Toggle({ enabled, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className={`w-10 h-5 rounded-full flex items-center px-1 transition-colors ${
        enabled ? 'bg-secondary' : 'bg-white/20'
      }`}
    >
      <div
        className={`w-3 h-3 bg-white rounded-full shadow-sm transition-transform ${
          enabled ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  );
}

/* ── Company Profile card ───────────────────────────────── */
function CompanyProfileCard() {
  const [name, setName] = useState(companyProfile.name);
  const [sector, setSector] = useState(companyProfile.sector);
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <section className="bg-surface-container-lowest rounded-xl p-6 shadow-sm ring-1 ring-outline-variant/15">
      <div className="flex items-center gap-2 mb-6">
        <span className="material-symbols-outlined text-secondary">business</span>
        <h2 className="text-lg font-bold font-headline">Profil de la Société</h2>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-6">
          {/* Logo placeholder */}
          <div className="relative group flex-shrink-0">
            <div className="w-24 h-24 rounded-lg bg-surface-container flex items-center justify-center overflow-hidden border-2 border-dashed border-outline-variant/30">
              <div className="w-full h-full bg-gradient-to-br from-surface-container-high to-surface-container-highest flex items-center justify-center">
                <span className="material-symbols-outlined text-3xl text-on-surface-variant opacity-40">
                  business
                </span>
              </div>
              <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer rounded-lg">
                <span className="material-symbols-outlined text-white">upload</span>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">
              Nom de l'entreprise
            </label>
            <input
              className="w-full bg-surface-container-low border-none outline-none rounded-lg focus:ring-2 focus:ring-secondary text-on-surface text-sm py-2.5 px-3"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">
            Secteur d'activité
          </label>
          <select
            className="w-full bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-secondary text-on-surface text-sm py-2.5 px-3"
            value={sector}
            onChange={(e) => setSector(e.target.value)}
          >
            {sectors.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>

        <button
          onClick={handleSave}
          className={`w-full py-2.5 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${
            saved
              ? 'bg-secondary-container text-on-secondary-container'
              : 'bg-secondary text-on-secondary hover:opacity-90'
          }`}
        >
          <span className="material-symbols-outlined text-sm">
            {saved ? 'check_circle' : 'save'}
          </span>
          {saved ? 'Profil sauvegardé !' : 'Sauvegarder le profil'}
        </button>
      </div>
    </section>
  );
}

/* ── Security card ──────────────────────────────────────── */
function SecurityCard() {
  const [twoFa, setTwoFa] = useState(true);

  return (
    <section className="bg-surface-container-lowest rounded-xl p-6 shadow-sm ring-1 ring-outline-variant/15">
      <div className="flex items-center gap-2 mb-6">
        <span className="material-symbols-outlined text-secondary">security</span>
        <h2 className="text-lg font-bold font-headline">Sécurité</h2>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-lg">
          <div>
            <p className="text-sm font-bold">Authentification à deux facteurs (2FA)</p>
            <p className="text-xs text-on-surface-variant">Sécurisez l'accès administrateur</p>
          </div>
          <button
            onClick={() => setTwoFa((v) => !v)}
            className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
              twoFa ? 'bg-secondary' : 'bg-outline-variant'
            }`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${
                twoFa ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        <button className="w-full py-2.5 border border-outline-variant/30 text-on-surface rounded-lg font-medium hover:bg-surface-container transition-colors flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-sm">lock_reset</span>
          Changer le mot de passe
        </button>
      </div>
    </section>
  );
}

/* ── Quote Config card ──────────────────────────────────── */
function QuoteConfigCard() {
  const [tva, setTva] = useState(quoteConfig.tva);
  const [validity, setValidity] = useState(quoteConfig.validity);
  const [currency, setCurrency] = useState(quoteConfig.currency);
  const [template, setTemplate] = useState(quoteConfig.pdfTemplate);

  return (
    <section className="col-span-2 bg-surface-container-lowest rounded-xl p-6 shadow-sm ring-1 ring-outline-variant/15">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary">description</span>
          <h2 className="text-lg font-bold font-headline">Configuration des Devis</h2>
        </div>
        <span className="px-3 py-1 bg-secondary/10 text-secondary text-[10px] font-bold uppercase rounded-full">
          Automatisé par IA
        </span>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">
              Taux de TVA (%)
            </label>
            <input
              className="w-full bg-surface-container-low border-none outline-none rounded-lg focus:ring-2 focus:ring-secondary text-sm px-3 py-2"
              type="number"
              value={tva}
              onChange={(e) => setTva(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">
              Validité par défaut (Jours)
            </label>
            <input
              className="w-full bg-surface-container-low border-none outline-none rounded-lg focus:ring-2 focus:ring-secondary text-sm px-3 py-2"
              type="number"
              value={validity}
              onChange={(e) => setValidity(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">
              Devise de facturation
            </label>
            <select
              className="w-full bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-secondary text-sm px-3 py-2"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              {currencies.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">
              Modèle PDF
            </label>
            <div className="flex gap-2">
              {pdfTemplates.map((t) => (
                <button
                  key={t}
                  onClick={() => setTemplate(t)}
                  className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-colors ${
                    template === t
                      ? 'bg-secondary text-on-secondary'
                      : 'bg-surface-container text-on-surface-variant border border-outline-variant/20'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Notification channels card ─────────────────────────── */
function NotificationChannelsCard() {
  const [channels, setChannels] = useState(notificationChannels);

  function toggleChannel(id) {
    setChannels((prev) =>
      prev.map((c) => (c.id === id ? { ...c, enabled: !c.enabled } : c))
    );
  }

  return (
    <section className="col-span-2 bg-primary-container text-white rounded-xl p-8 shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-secondary rounded-lg">
          <span className="material-symbols-outlined text-on-secondary">smart_toy</span>
        </div>
        <div>
          <h2 className="text-xl font-bold font-headline">Canaux de Notification IA</h2>
          <p className="text-on-primary-container text-sm">
            Validation "Human-in-the-loop" pour les devis automatiques
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {channels.map((ch) => (
          <div
            key={ch.id}
            className={`bg-white/5 p-4 rounded-xl border transition-colors ${
              ch.enabled ? 'border-secondary/50' : 'border-white/10 hover:border-white/20'
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">{ch.icon}</span>
              </div>
              <Toggle enabled={ch.enabled} onToggle={() => toggleChannel(ch.id)} />
            </div>
            <h3 className="font-bold mb-1">{ch.name}</h3>
            <p className="text-[10px] text-on-primary-container uppercase font-semibold">
              {ch.detail}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Team management table ──────────────────────────────── */
function TeamCard() {
  const [members, setMembers] = useState(teamMembers);

  function handleRemove(id) {
    setMembers((prev) => prev.filter((m) => m.id !== id));
  }

  return (
    <section className="col-span-12 bg-surface-container-lowest rounded-xl shadow-sm ring-1 ring-outline-variant/15 overflow-hidden">
      <div className="p-6 border-b border-surface-container flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary">group</span>
          <h2 className="text-lg font-bold font-headline">Gestion de l'Équipe</h2>
        </div>
        <button className="px-4 py-2 bg-secondary text-on-secondary rounded-lg text-sm font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity">
          <span className="material-symbols-outlined text-sm">person_add</span>
          Nouvel utilisateur
        </button>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-surface-container-low">
            {['Collaborateur', 'Rôle', 'Dernière activité', 'Statut', ''].map((col) => (
              <th
                key={col}
                className="text-left py-4 px-6 text-xs font-bold uppercase tracking-wider text-on-surface-variant"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-surface-container">
          {members.map((m) => (
            <tr
              key={m.id}
              className={`hover:bg-surface-container-high/30 transition-colors ${
                !m.active ? 'opacity-60' : ''
              }`}
            >
              <td className="py-4 px-6">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs ${m.avatarBg}`}
                  >
                    {m.initials}
                  </div>
                  <div>
                    <div className="font-bold text-sm">{m.name}</div>
                    <div className="text-xs text-on-surface-variant">{m.email}</div>
                  </div>
                </div>
              </td>
              <td className="py-4 px-6">
                <span
                  className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded-md border ${m.roleStyle}`}
                >
                  {m.role}
                </span>
              </td>
              <td className="py-4 px-6 text-sm text-on-surface-variant italic">
                {m.lastActivity}
              </td>
              <td className="py-4 px-6">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      m.active ? 'bg-secondary' : 'bg-outline'
                    }`}
                  />
                  <span
                    className={`text-xs font-medium ${
                      m.active ? '' : 'text-on-surface-variant'
                    }`}
                  >
                    {m.active ? 'Actif' : 'Inactif'}
                  </span>
                </div>
              </td>
              <td className="py-4 px-6 text-right">
                <button
                  className="text-on-surface-variant hover:text-primary transition-colors"
                  onClick={() => handleRemove(m.id)}
                >
                  <span className="material-symbols-outlined">more_horiz</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

/* ── Page ────────────────────────────────────────────────── */
export default function Settings() {
  return (
    <>
      {/* Header */}
      <header className="mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight font-headline text-on-surface mb-2">
          Paramètres de l'Administration
        </h1>
        <p className="text-on-surface-variant max-w-2xl">
          Configurez votre environnement Leadger Command pour optimiser les flux de travail IA et
          la gestion opérationnelle de votre PME de maintenance technique.
        </p>
      </header>

      <div className="grid grid-cols-12 gap-8">
        {/* Left column */}
        <div className="col-span-12 lg:col-span-5 space-y-8">
          <CompanyProfileCard />
          <SecurityCard />
        </div>

        {/* Right column */}
        <div className="col-span-12 lg:col-span-7 space-y-8">
          <div className="grid grid-cols-2 gap-8">
            <QuoteConfigCard />
            <NotificationChannelsCard />
          </div>
        </div>

        {/* Full-width team table */}
        <TeamCard />
      </div>
    </>
  );
}
