import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../hooks/useAppStore';
import { DEMO_ACCOUNTS, type DemoAccount } from '../../data/mock/demoAccounts';
import { ShieldCheck, KeyRound, User, ArrowRight, Lock, CheckCircle2, AlertTriangle, Layers } from 'lucide-react';
import { APP_NAME, APP_SUBTITLE, PROBLEM_STATEMENT, JURISDICTION } from '../../data/constants';

interface OpeningAuthGatewayProps {
  onSuccess?: () => void;
}

export default function OpeningAuthGateway({ onSuccess }: OpeningAuthGatewayProps) {
  const navigate = useNavigate();
  const { login } = useAppStore();
  const [selectedAccount, setSelectedAccount] = useState<DemoAccount>(DEMO_ACCOUNTS[0]);
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showMatrixModal, setShowMatrixModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'quick' | 'credentials'>('quick');

  const handleQuickLogin = (account: DemoAccount) => {
    login(account);
    navigate('/command', { replace: true });
    if (onSuccess) onSuccess();
  };

  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    const trimmedUser = usernameInput.trim().toLowerCase();
    const matched = DEMO_ACCOUNTS.find(
      (a) => a.username.toLowerCase() === trimmedUser || a.name.toLowerCase().includes(trimmedUser)
    );

    if (matched && (passwordInput === 'admin' || passwordInput === 'pravah@2026' || passwordInput === '123456')) {
      login(matched);
      navigate('/command', { replace: true });
      if (onSuccess) onSuccess();
    } else {
      setLoginError('Invalid credentials. Use one of the demo usernames: "deo", "ndrf", "field", "admin" with password "admin".');
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f6fc] text-[#0b1c30] flex flex-col justify-between font-sans selection:bg-primary-container selection:text-white">
      {/* Top Government Security Strip */}
      <header className="bg-[#ffffff] border-b border-[#c4c5d5] px-6 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <img src="/favicon.png" alt="Pravah Logo" className="w-10 h-10 rounded shadow-sm object-cover" />
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[18px] uppercase tracking-tight text-[#00288e]">{APP_NAME}</span>
              <span className="px-1.5 py-0.5 rounded bg-[#e5eeff] text-[#00288e] text-[11px] font-mono font-bold border border-[#c4c5d5]">
                {PROBLEM_STATEMENT}
              </span>
            </div>
            <span className="text-[12px] text-[#444653] font-medium">{APP_SUBTITLE}</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-3 text-[12px] font-mono text-[#444653]">
          <span className="px-2.5 py-1 rounded bg-[#eff4ff] border border-[#c4c5d5]">
            JURISDICTION: <strong>{JURISDICTION.state} / {JURISDICTION.district}</strong>
          </span>
          <span className="px-2.5 py-1 rounded bg-[#fee2e2] text-[#991b1b] border border-[#fca5a5] font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#dc2626] animate-pulse" />
            EOC MONSOON PROTOCOL ACTIVE
          </span>
        </div>
      </header>

      {/* Main Authentication Center */}
      <main className="max-w-6xl w-full mx-auto px-4 py-8 flex flex-col items-center">
        {/* Title Header */}
        <div className="text-center max-w-2xl mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#dde1ff] text-[#001453] text-[12px] font-bold uppercase font-mono tracking-wider mb-3 border border-[#b8c4ff]">
            <Lock size={13} /> Multi-Tier Role-Based Access Control (RBAC)
          </div>
          <h1 className="text-[28px] sm:text-[34px] font-extrabold text-[#00288e] tracking-tight leading-tight">
            Tactical Operations Login Gateway
          </h1>
          <p className="text-[14px] sm:text-[15px] text-[#444653] mt-2 leading-relaxed">
            Select your emergency response role or log in with designated operational credentials. Your authorization tier dictates access to GIS telemetry, CAP siren broadcast, and NDRF mobilization.
          </p>
        </div>

        {/* Login Method Tabs */}
        <div className="flex items-center justify-center gap-2 mb-6 p-1 bg-[#e2e7ff] rounded-lg border border-[#c4c5d5]">
          <button
            onClick={() => setActiveTab('quick')}
            className={`px-5 py-2 rounded-md text-[13px] font-bold transition-all ${
              activeTab === 'quick'
                ? 'bg-[#00288e] text-white shadow-sm'
                : 'text-[#444653] hover:text-[#0b1c30]'
            }`}
          >
            ⚡ 1-Click Quick Demo Login (Recommended)
          </button>
          <button
            onClick={() => setActiveTab('credentials')}
            className={`px-5 py-2 rounded-md text-[13px] font-bold transition-all ${
              activeTab === 'credentials'
                ? 'bg-[#00288e] text-white shadow-sm'
                : 'text-[#444653] hover:text-[#0b1c30]'
            }`}
          >
            🔑 Manual Credentials Entry
          </button>
        </div>

        {/* TAB 1: 1-Click Role Accounts Grid */}
        {activeTab === 'quick' && (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
            {DEMO_ACCOUNTS.map((acc) => {
              const isSelected = selectedAccount.id === acc.id;
              const isDeo = acc.role === 'DISTRICT_EMERGENCY_OFFICER';
              const isNdrf = acc.role === 'NDRF_OFFICER';
              const isField = acc.role === 'FIELD_OFFICER';

              const roleBadgeColor = isDeo
                ? 'bg-[#00288e] text-white'
                : isNdrf
                ? 'bg-[#ea580c] text-white'
                : isField
                ? 'bg-[#006a63] text-white'
                : 'bg-[#4338ca] text-white';

              const borderHighlight = isDeo
                ? 'hover:border-[#00288e]'
                : isNdrf
                ? 'hover:border-[#ea580c]'
                : isField
                ? 'hover:border-[#006a63]'
                : 'hover:border-[#4338ca]';

              return (
                <div
                  key={acc.id}
                  onClick={() => setSelectedAccount(acc)}
                  className={`bg-[#ffffff] rounded-xl border-2 p-5 shadow-sm transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected ? 'border-[#00288e] shadow-md ring-2 ring-[#00288e]/20' : 'border-[#c4c5d5]'
                  } ${borderHighlight}`}
                >
                  <div className="flex flex-col gap-3">
                    {/* Header badge & Clearance */}
                    <div className="flex items-center justify-between">
                      <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold font-mono ${roleBadgeColor}`}>
                        {acc.role.replace(/_/g, ' ')}
                      </span>
                      <span className="text-[11px] font-mono text-[#444653] font-semibold">
                        {acc.badgeId}
                      </span>
                    </div>

                    {/* Officer Identity */}
                    <div className="flex items-center gap-3 mt-1">
                      <div className={`w-12 h-12 rounded-lg ${roleBadgeColor} flex items-center justify-center text-white font-extrabold text-[16px] shadow-sm flex-shrink-0`}>
                        {acc.avatarInitials}
                      </div>
                      <div>
                        <h3 className="font-bold text-[16px] text-[#0b1c30] leading-tight">{acc.name}</h3>
                        <p className="text-[12px] text-[#00288e] font-semibold">{acc.designation}</p>
                        <p className="text-[11px] text-[#444653] truncate">{acc.department}</p>
                      </div>
                    </div>

                    {/* Clearance Level pill */}
                    <div className="p-2 rounded bg-[#f4f6fc] border border-[#c4c5d5] text-[11px] font-mono flex items-center justify-between">
                      <span className="text-[#444653]">AUTHORIZATION:</span>
                      <strong className="text-[#00288e]">{acc.clearanceLevel}</strong>
                    </div>

                    {/* Permissions Snippet */}
                    <div className="flex flex-col gap-1 text-[12px]">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#444653] font-bold">Key Authority & Capabilities:</span>
                      <ul className="space-y-1">
                        {acc.capabilities.slice(0, 3).map((cap, i) => (
                          <li key={i} className="flex items-start gap-1.5 text-[#0b1c30]">
                            <CheckCircle2 size={13} className="text-[#16a34a] mt-0.5 flex-shrink-0" />
                            <span>{cap}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Restrictions Snippet */}
                    {acc.restrictions.length > 0 && (
                      <div className="flex items-center gap-1.5 text-[11px] text-[#ba1a1a] bg-[#ffdad6]/40 p-1.5 rounded border border-[#ffdad6]">
                        <AlertTriangle size={12} className="flex-shrink-0" />
                        <span className="truncate">{acc.restrictions[0]}</span>
                      </div>
                    )}
                  </div>

                  {/* 1-Click Login Action Button */}
                  <div className="pt-4 border-t border-[#c4c5d5] mt-4 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-[#444653]">
                      Login ID: <strong className="text-[#0b1c30] font-mono">{acc.username}</strong>
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleQuickLogin(acc);
                      }}
                      className={`h-9 px-4 rounded-md font-bold text-[13px] transition-all flex items-center gap-2 shadow-sm ${
                        isDeo
                          ? 'bg-[#00288e] hover:bg-blue-900 text-white'
                          : isNdrf
                          ? 'bg-[#ea580c] hover:bg-orange-700 text-white'
                          : isField
                          ? 'bg-[#006a63] hover:bg-teal-800 text-white'
                          : 'bg-[#4338ca] hover:bg-indigo-800 text-white'
                      }`}
                    >
                      Login as {acc.role === 'DISTRICT_EMERGENCY_OFFICER' ? 'DEO' : acc.role === 'NDRF_OFFICER' ? 'NDRF' : acc.role === 'FIELD_OFFICER' ? 'Field' : 'Admin'}
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 2: Manual Credentials Form */}
        {activeTab === 'credentials' && (
          <div className="w-full max-w-md bg-[#ffffff] p-6 rounded-xl border border-[#c4c5d5] shadow-md flex flex-col gap-4">
            <div className="flex items-center gap-2 border-b border-[#c4c5d5] pb-3">
              <ShieldCheck size={20} className="text-[#00288e]" />
              <div>
                <h3 className="text-[16px] font-bold text-[#00288e]">Statutory Officer Login</h3>
                <p className="text-[12px] text-[#444653]">Authenticate with your government officer credentials</p>
              </div>
            </div>

            {loginError && (
              <div className="p-3 bg-[#ffdad6] border border-[#ba1a1a] text-[#93000a] text-[12px] font-bold rounded flex items-center gap-2">
                <AlertTriangle size={16} className="flex-shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleManualLogin} className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-mono font-bold text-[#444653] uppercase">Officer Username / Email</label>
                <div className="relative">
                  <User size={15} className="absolute left-3 top-2.5 text-[#444653]" />
                  <input
                    type="text"
                    placeholder="e.g. deo, ndrf, field, or admin"
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value)}
                    className="w-full h-9 pl-9 pr-3 rounded border border-[#c4c5d5] text-[13px] bg-[#f4f6fc] focus:bg-white focus:outline-none focus:border-[#00288e]"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-mono font-bold text-[#444653] uppercase">Authorized Passcode</label>
                <div className="relative">
                  <KeyRound size={15} className="absolute left-3 top-2.5 text-[#444653]" />
                  <input
                    type="password"
                    placeholder="Enter password (demo: admin)"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className="w-full h-9 pl-9 pr-3 rounded border border-[#c4c5d5] text-[13px] bg-[#f4f6fc] focus:bg-white focus:outline-none focus:border-[#00288e]"
                    required
                  />
                </div>
              </div>

              <div className="p-3 rounded bg-[#eff4ff] border border-[#c4c5d5] text-[11px] font-mono text-[#00288e]">
                <strong>Quick Demo Hint:</strong> All 4 accounts accept password: <code className="bg-white px-1.5 py-0.5 rounded font-bold">admin</code>
              </div>

              <button
                type="submit"
                className="w-full h-10 mt-2 bg-[#00288e] hover:bg-blue-900 text-white font-bold rounded text-[13px] transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <Lock size={15} /> Authenticate Session
              </button>
            </form>
          </div>
        )}

        {/* Access Matrix Modal Trigger */}
        <div className="mt-8 flex items-center gap-3">
          <button
            onClick={() => setShowMatrixModal(true)}
            className="px-4 py-2 rounded-md bg-[#ffffff] border border-[#c4c5d5] text-[#00288e] font-semibold text-[13px] hover:bg-[#e2e7ff] transition-colors flex items-center gap-2 shadow-sm"
          >
            <Layers size={15} />
            View Complete Role Access & Permissions Table
          </button>
        </div>
      </main>

      {/* Permissions Matrix Modal */}
      {showMatrixModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#ffffff] rounded-xl border border-[#c4c5d5] max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
            <div className="p-4 bg-[#eff4ff] border-b border-[#c4c5d5] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck size={20} className="text-[#00288e]" />
                <h3 className="font-bold text-[18px] text-[#00288e]">PRAVAH Role-Based Access Control (RBAC) Matrix</h3>
              </div>
              <button
                onClick={() => setShowMatrixModal(false)}
                className="w-8 h-8 rounded-full bg-white border border-[#c4c5d5] flex items-center justify-center font-bold text-[#444653] hover:bg-gray-100"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              <table className="w-full text-left border-collapse text-[12px]">
                <thead>
                  <tr className="bg-[#f4f6fc] border-b-2 border-[#c4c5d5] text-[11px] font-mono uppercase text-[#444653]">
                    <th className="p-3">Tactical Module / Console</th>
                    <th className="p-3 text-center bg-[#dde1ff]/50 text-[#001453]">DEO (IAS)</th>
                    <th className="p-3 text-center bg-[#ffedd5]/50 text-[#9a3412]">NDRF (Comdt)</th>
                    <th className="p-3 text-center bg-[#ccfbf1]/50 text-[#115e59]">Field Officer</th>
                    <th className="p-3 text-center bg-[#e0e7ff]/50 text-[#3730a3]">Admin (NIC)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#c4c5d5] font-mono">
                  <tr>
                    <td className="p-3 font-sans font-semibold text-[#0b1c30]">Command Overview (/command)</td>
                    <td className="p-3 text-center text-[#16a34a] font-bold">FULL</td>
                    <td className="p-3 text-center text-[#16a34a] font-bold">FULL</td>
                    <td className="p-3 text-center text-[#16a34a] font-bold">FULL</td>
                    <td className="p-3 text-center text-[#16a34a] font-bold">FULL</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-sans font-semibold text-[#0b1c30]">Live GIS Risk Map (/map)</td>
                    <td className="p-3 text-center text-[#16a34a] font-bold">FULL</td>
                    <td className="p-3 text-center text-[#16a34a] font-bold">FULL</td>
                    <td className="p-3 text-center text-[#16a34a] font-bold">FULL</td>
                    <td className="p-3 text-center text-[#16a34a] font-bold">FULL</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-sans font-semibold text-[#0b1c30]">Flood & Slope Forecast (/forecast)</td>
                    <td className="p-3 text-center text-[#16a34a] font-bold">FULL</td>
                    <td className="p-3 text-center text-[#16a34a] font-bold">FULL</td>
                    <td className="p-3 text-center text-[#16a34a] font-bold">FULL</td>
                    <td className="p-3 text-center text-[#16a34a] font-bold">FULL</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-sans font-semibold text-[#0b1c30]">NDRF Tactical Deployment (/ndrf)</td>
                    <td className="p-3 text-center bg-[#dde1ff]/30 text-[#00288e] font-bold">APPROVE & ORDER</td>
                    <td className="p-3 text-center bg-[#ffedd5]/30 text-[#ea580c] font-bold">TACTICAL DISPATCH</td>
                    <td className="p-3 text-center text-[#64748b]">VIEW ETA</td>
                    <td className="p-3 text-center text-[#16a34a] font-bold">FULL</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-sans font-semibold text-[#0b1c30]">Emergency Siren / CAP Alerts (/alerts)</td>
                    <td className="p-3 text-center bg-[#dde1ff]/30 text-[#00288e] font-bold">AUTHORIZE SIREN</td>
                    <td className="p-3 text-center text-[#64748b]">READ & ACK</td>
                    <td className="p-3 text-center text-[#64748b]">READ ONLY</td>
                    <td className="p-3 text-center text-[#16a34a] font-bold">FULL</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-sans font-semibold text-[#0b1c30]">Statutory SitRep Generator (/sitrep)</td>
                    <td className="p-3 text-center bg-[#dde1ff]/30 text-[#00288e] font-bold">SIGN & TRANSMIT</td>
                    <td className="p-3 text-center text-[#64748b]">READ & EXPORT</td>
                    <td className="p-3 text-center text-[#dc2626]">RESTRICTED</td>
                    <td className="p-3 text-center text-[#16a34a] font-bold">FULL</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-sans font-semibold text-[#0b1c30]">Citizen Ground Truth (/reports)</td>
                    <td className="p-3 text-center text-[#16a34a] font-bold">TRIAGE & VERIFY</td>
                    <td className="p-3 text-center text-[#16a34a] font-bold">RESCUE ESCALATE</td>
                    <td className="p-3 text-center bg-[#ccfbf1]/30 text-[#006a63] font-bold">LOG & VERIFY</td>
                    <td className="p-3 text-center text-[#16a34a] font-bold">FULL</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-sans font-semibold text-[#0b1c30]">System Telemetry Feeds (/system)</td>
                    <td className="p-3 text-center text-[#16a34a] font-bold">MONITOR</td>
                    <td className="p-3 text-center text-[#64748b]">MONITOR</td>
                    <td className="p-3 text-center text-[#dc2626]">RESTRICTED</td>
                    <td className="p-3 text-center bg-[#e0e7ff]/30 text-[#4338ca] font-bold">FULL CALIBRATE</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-sans font-semibold text-[#0b1c30]">Admin Backend Portal (/admin)</td>
                    <td className="p-3 text-center text-[#dc2626]">RESTRICTED</td>
                    <td className="p-3 text-center text-[#dc2626]">RESTRICTED</td>
                    <td className="p-3 text-center text-[#dc2626]">RESTRICTED</td>
                    <td className="p-3 text-center bg-[#e0e7ff]/30 text-[#4338ca] font-bold">SUPERADMIN ACCESS</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-[#f4f6fc] border-t border-[#c4c5d5] flex justify-end">
              <button
                onClick={() => setShowMatrixModal(false)}
                className="px-4 py-1.5 bg-[#00288e] text-white font-bold rounded text-[13px]"
              >
                Close Matrix
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-[#ffffff] border-t border-[#c4c5d5] px-6 py-4 text-center text-[12px] text-[#444653] font-mono">
        PRAVAH Early Warning Command & Decision Support System • Government of Meghalaya / DDMA East Khasi Hills • Smart India Hackathon
      </footer>
    </div>
  );
}
