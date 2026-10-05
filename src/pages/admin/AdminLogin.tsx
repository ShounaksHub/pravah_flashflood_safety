import { useState } from 'react';
import { useAppStore } from '../../hooks/useAppStore';
import { KeyRound, User } from 'lucide-react';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setAdminAuthenticated } = useAppStore();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Demo credentials
    if (username === 'demo' && password === 'admin123') {
      setAdminAuthenticated(true);
      useAppStore.getState().setRole('ADMIN');
    } else {
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#faf8ff] font-sans">
      <div className="w-full max-w-md bg-[#ffffff] p-8 rounded-lg shadow-[0_4px_6px_-1px_rgba(15,23,42,0.12)] border border-[#c4c5d5]">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-xl overflow-hidden shadow-md mb-4 border border-[#c4c5d5]">
            <img src="/favicon.png" alt="Pravah Logo" className="w-full h-full object-cover" />
          </div>
          <h2 className="text-[24px] font-bold text-[#003757] text-center leading-tight">System Administration</h2>
          <p className="text-[13px] text-[#444653] font-mono mt-1">Pravah Backend Configurator • DEMO AUTH</p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          {error && (
            <div className="p-3 bg-[#ffdad6] text-[#93000a] text-[13px] font-bold rounded border border-[#ba1a1a]">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-bold text-[#444653] uppercase tracking-wider font-mono">Username</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User size={16} className="text-[#757684]" />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-3 py-2 bg-[#f2f3ff] border border-[#c4c5d5] rounded text-[15px] focus:outline-none focus:border-[#00288e] focus:ring-1 focus:ring-[#00288e]"
                placeholder="Enter username"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-bold text-[#444653] uppercase tracking-wider font-mono">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <KeyRound size={16} className="text-[#757684]" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3 py-2 bg-[#f2f3ff] border border-[#c4c5d5] rounded text-[15px] focus:outline-none focus:border-[#00288e] focus:ring-1 focus:ring-[#00288e]"
                placeholder="Enter password"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-2 w-full py-2.5 bg-[#00288e] hover:bg-[#1e40af] text-white font-bold rounded transition-colors shadow-sm"
          >
            Authenticate
          </button>
        </form>
      </div>
    </div>
  );
}
