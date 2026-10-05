import { Outlet } from 'react-router-dom';
import TopBar from './TopBar';
import Sidebar from './Sidebar';
import { useEffect } from 'react';
import { useAppStore } from '../../hooks/useAppStore';

export default function AppShell() {

  // Online/offline detection
  useEffect(() => {
    const setOnline = useAppStore.getState().setOnline;
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div className="min-h-screen bg-surface">
      <TopBar />
      <Sidebar />
      <div className="pl-72">
        <main className="w-full min-h-screen pt-16 bg-surface px-4 py-3">
          <div className="max-w-[1440px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
