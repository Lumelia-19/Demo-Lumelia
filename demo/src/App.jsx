import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Inbox from './pages/Inbox';
import QuoteDetail from './pages/QuoteDetail';
import Activity from './pages/Activity';
import Settings from './pages/Settings';

function Placeholder({ title }) {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-on-surface-variant">
      <span className="material-symbols-outlined text-5xl mb-4 opacity-30">construction</span>
      <p className="font-headline font-bold text-xl">{title}</p>
      <p className="text-sm mt-2 opacity-60">Page en cours de développement</p>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="inbox" element={<Inbox />} />
          <Route path="devis" element={<QuoteDetail />} />
          <Route path="activite" element={<Activity />} />
          <Route path="parametres" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
