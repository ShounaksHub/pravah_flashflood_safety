import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, LogOut, ShieldCheck, CheckCircle2, MapPin } from 'lucide-react';
import { APP_NAME, APP_SUBTITLE, PROBLEM_STATEMENT, JURISDICTION } from '../../data/constants';
import { useAppStore } from '../../hooks/useAppStore';
import { formatTime, formatRelativeTime } from '../../utils/formatting';
import type { UserRole } from '../../types/reports';

const ROLE_LABELS: Record<UserRole, string> = {
  DISTRICT_EMERGENCY_OFFICER: 'District Emergency Officer',
  NDRF_OFFICER: 'NDRF Tactical Commander',
  FIELD_OFFICER: 'Field Incident Officer',
  ADMIN: 'Root System Admin',
};

export default function TopBar() {
  const navigate = useNavigate();
  const { currentRole, alerts, sensors, lastSync, isOnline, currentUser, logout, acknowledgeAlert } = useAppStore();
  const [showNotifications, setShowNotifications] = useState(false);

  const activeAlertsList = alerts.filter((a) => a.status === 'ACTIVE');
  const onlineSensors = sensors.filter((s) => s.status !== 'offline').length;

  const handleSwitchOfficer = () => {
    setShowNotifications(false);
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-surface-container-lowest border-b border-outline-variant z-50 px-4">
      <div className="h-16 flex items-center justify-between gap-3">
        {/* Left: Brand */}
        <div className="flex items-center gap-3 min-w-max">
          <img 
            src="/favicon.png" 
            alt="Pravah Command Logo" 
            className="w-9 h-9 rounded shadow-sm object-cover flex-shrink-0" 
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-headline-sm uppercase tracking-tight text-primary">{APP_NAME}</span>
              <span className="px-1.5 py-0.5 rounded bg-surface-container text-on-surface-variant text-code-sm border border-outline-variant font-semibold">{PROBLEM_STATEMENT}</span>
            </div>
            <span className="text-code-sm text-on-surface-variant">{APP_SUBTITLE}</span>
          </div>
        </div>

        {/* Center: Status pills */}
        <div className="hidden xl:flex items-center gap-2">
          <div className="flex items-center gap-1 px-2.5 py-1 rounded bg-surface-container-low border border-outline-variant text-code-sm text-on-surface">
            <span className="text-label-caps text-on-surface-variant">Jurisdiction:</span>
            <span className="font-semibold">{JURISDICTION.state}</span>
            <span className="text-outline-variant">/</span>
            <span>{JURISDICTION.district}</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-error-container text-on-error-container border border-error text-code-sm font-semibold">
            <span className="w-2 h-2 rounded-full bg-error animate-ping" />
            <span>MONSOON MODE ACTIVE</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface-container-low border border-outline-variant text-code-sm">
            <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-secondary' : 'bg-error'}`} />
            <span className={`font-semibold ${isOnline ? 'text-secondary' : 'text-error'}`}>
              {isOnline ? `${onlineSensors}/${sensors.length} ONLINE` : 'OFFLINE'}
            </span>
          </div>
          <div className="px-2.5 py-1 rounded bg-surface-container-low border border-outline-variant text-code-sm text-on-surface-variant">
            <span>SYNC:</span>
            <span className="font-semibold text-on-surface ml-1">{formatTime(lastSync)} IST</span>
          </div>
          <div className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant text-label-caps border border-outline uppercase">Demo Data</div>
        </div>

        {/* Right: Clearance Badge + Notifications Dropdown + Officer Identity + Secure Logout */}
        <div className="flex items-center gap-2.5">
          {/* Statutory Role Badge */}
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface-container-low border border-outline-variant text-[11px] font-mono">
            <ShieldCheck size={14} className="text-primary" />
            <span className="text-on-surface font-bold truncate max-w-[170px]">
              {ROLE_LABELS[currentRole]}
            </span>
          </div>

          {/* Interactive Notification Bell with Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              title="Tactical Notifications & Active Incident Warnings"
              aria-label="Tactical Notifications & Active Incident Warnings"
              id="tactical-notifications-bell"
              className={`relative h-8 w-8 rounded border border-outline-variant flex items-center justify-center transition-colors cursor-pointer ${
                showNotifications 
                  ? 'bg-primary text-white shadow-sm' 
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
              }`}
            >
              <Bell size={16} />
              {activeAlertsList.length > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-error text-white text-[10px] leading-none flex items-center justify-center font-bold animate-pulse shadow-sm">
                  {activeAlertsList.length}
                </span>
              )}
            </button>

            {/* Tactical Notifications Panel */}
            {showNotifications && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setShowNotifications(false)} 
                />

                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#ffffff] rounded-xl border border-outline-variant shadow-2xl z-50 overflow-hidden flex flex-col animate-in fade-in duration-100">
                  {/* Panel Header */}
                  <div className="p-3 bg-surface-container-low border-b border-outline-variant flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bell size={16} className="text-primary" />
                      <span className="font-bold text-[13px] text-on-surface">Active Warning Stream</span>
                      <span className="px-1.5 py-0.5 rounded bg-error text-white font-mono text-[10px] font-bold">
                        {activeAlertsList.length} PENDING
                      </span>
                    </div>
                    <button 
                      onClick={() => setShowNotifications(false)}
                      className="w-6 h-6 rounded flex items-center justify-center text-on-surface-variant hover:bg-surface-container text-xs font-bold"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Panel Content */}
                  <div className="max-h-80 overflow-y-auto divide-y divide-outline-variant p-1">
                    {activeAlertsList.length === 0 ? (
                      <div className="p-6 text-center text-on-surface-variant text-code-sm flex flex-col items-center gap-2">
                        <CheckCircle2 size={24} className="text-secondary" />
                        <span>All operational alerts have been acknowledged.</span>
                      </div>
                    ) : (
                      activeAlertsList.map(alert => (
                        <div key={alert.id} className="p-2.5 flex flex-col gap-1 hover:bg-surface-container-low/70 transition-colors">
                          <div className="flex items-center justify-between">
                            <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold font-mono text-white ${
                              alert.severity === 'CRITICAL' ? 'bg-error' : alert.severity === 'WARNING' ? 'bg-[#ea580c]' : 'bg-[#ca8a04]'
                            }`}>
                              {alert.severity}
                            </span>
                            <span className="text-[10px] font-mono text-on-surface-variant">
                              {formatRelativeTime(alert.issuedAt)}
                            </span>
                          </div>
                          <span className="font-bold text-[12px] text-on-surface leading-snug">
                            {alert.title}
                          </span>
                          <p className="text-[11px] text-on-surface-variant line-clamp-2 leading-tight">
                            {alert.description}
                          </p>
                          <div className="flex items-center justify-between pt-1 border-t border-surface-container mt-0.5">
                            <span className="text-[10px] text-primary font-semibold flex items-center gap-1">
                              <MapPin size={10} /> {alert.location}
                            </span>
                            <button
                              onClick={() => acknowledgeAlert(alert.id)}
                              className="h-6 px-2.5 bg-surface-container hover:bg-secondary hover:text-white rounded text-[10px] font-semibold text-on-surface transition-colors flex items-center gap-1 active:scale-95"
                            >
                              <CheckCircle2 size={11} /> Ack Alert
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Panel Footer */}
                  <div className="p-2.5 bg-surface-container-low border-t border-outline-variant flex items-center justify-between">
                    <span className="text-[11px] text-on-surface-variant font-mono">CAP Feed Active</span>
                    <button
                      onClick={() => {
                        setShowNotifications(false);
                        navigate('/alerts');
                      }}
                      className="text-[11px] font-bold text-primary hover:underline flex items-center gap-1"
                    >
                      Open Alert Console →
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Active Officer Identity */}
          <div className="flex items-center gap-2 pl-2 border-l border-outline-variant">
            <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-on-primary text-xs font-bold shadow-sm flex-shrink-0">
              {currentUser?.avatarInitials || 'RL'}
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-[12px] font-bold text-on-surface truncate max-w-[120px]">
                {currentUser?.name.split(',')[0] || 'Shri R. Lyngdoh'}
              </span>
              <span className="text-[10px] font-mono text-primary font-semibold">
                {currentUser?.role === 'DISTRICT_EMERGENCY_OFFICER' ? 'DEO / IAS' : currentUser?.role === 'NDRF_OFFICER' ? 'NDRF CO' : currentUser?.role === 'FIELD_OFFICER' ? 'Field Lead' : 'Superadmin'}
              </span>
            </div>
          </div>

          {/* Secure Logout / Switch Officer Button */}
          <button
            onClick={handleSwitchOfficer}
            title="Log out and return to Opening Tactical Login Gateway"
            className="h-8 px-2.5 bg-surface-container-low hover:bg-[#fee2e2] text-[#991b1b] rounded border border-outline-variant text-[11px] font-bold transition-colors flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
          >
            <LogOut size={13} />
            <span className="inline">Switch Officer</span>
          </button>
        </div>
      </div>
    </header>
  );
}
