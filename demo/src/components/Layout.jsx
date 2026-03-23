import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import NotificationDrawer from './NotificationDrawer';

export default function Layout() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="bg-surface text-on-surface min-h-screen">
      <Sidebar />
      <Header onNotificationClick={() => setDrawerOpen(true)} />
      <main className="ml-64 pt-24 px-8 pb-12 min-h-screen">
        <Outlet />
      </main>
      <NotificationDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
      {drawerOpen && (
        <div
          className="fixed inset-0 z-50"
          onClick={() => setDrawerOpen(false)}
        />
      )}
    </div>
  );
}
