import { Outlet, Navigate } from 'react-router-dom';
import { useAppStore } from '../../hooks/useAppStore';
import AdminLogin from '../../pages/admin/AdminLogin';
import { LogOut, Shield } from 'lucide-react';
import { APP_NAME } from '../../data/constants';

export default function AdminLayout() {
  const { isAdminAuthenticated, setAdminAuthenticated, currentRole } = useAppStore();

  if (!isAdminAuthenticated) {
    if (currentRole !== 'ADMIN' && currentRole !== 'DISTRICT_EMERGENCY_OFFICER') {
       return <Navigate to="/command" replace />;
    }
    return <AdminLogin />;
  }

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] font-sans">
      {/* Admin Top Bar */}
      <header className="h-16 bg-[#ffffff] border-b border-[#c4c5d5] px-6 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <img 
            src="/favicon.png" 
            alt="Pravah Logo" 
            className="w-10 h-10 rounded shadow-sm object-cover flex-shrink-0" 
          />
          <div>
            <h1 className="text-[20px] font-bold text-[#003757] leading-tight">System Administration</h1>
            <p className="text-[13px] text-[#444653] font-mono">{APP_NAME} Backend</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#e2e7ff] rounded-md border border-[#c4c5d5]">
            <Shield size={16} className="text-[#00288e]" />
            <span className="text-[13px] font-bold text-[#001453]">SUPERADMIN</span>
          </div>
          <button 
            onClick={() => setAdminAuthenticated(false)}
            className="flex items-center gap-2 px-3 py-1.5 text-[#ba1a1a] hover:bg-[#ffdad6] rounded transition-colors"
          >
            <LogOut size={16} />
            <span className="text-[13px] font-bold">Logout</span>
          </button>
        </div>
      </header>

      {/* Admin Content Area */}
      <main className="p-6 max-w-7xl mx-auto">
        <Outlet />
      </main>
    </div>
  );
}
