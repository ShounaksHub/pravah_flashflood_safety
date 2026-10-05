import { Bell, LogOut } from 'lucide-react';
import { APP_NAME, APP_SUBTITLE, PROBLEM_STATEMENT, JURISDICTION } from '../../data/constants';
import { useAppStore } from '../../hooks/useAppStore';
import { formatTime } from '../../utils/formatting';
import type { UserRole } from '../../types/reports';

const ROLE_LABELS: Record<UserRole, string> = {
  DISTRICT_EMERGENCY_OFFICER: 'District Emergency Officer',
  NDRF_OFFICER: 'NDRF Officer',
  FIELD_OFFICER: 'Field Officer',
  ADMIN: 'Admin',
};

export default function TopBar() {
  const { currentRole, setRole, alerts, sensors, lastSync, isOnline, currentUser, logout } = useAppStore();
  const activeAlerts = alerts.filter((a) => a.status === 'ACTIVE').length;
  const onlineSensors = sensors.filter((s) => s.status !== 'offline').length;

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

        {/* Right: Role + Notifications + User Avatar & Logout */}
        <div className="flex items-center gap-2.5">
          <select
            className="h-8 px-2 bg-surface-container-low border border-outline-variant rounded text-body-sm text-on-surface focus:outline-none focus:border-primary font-medium"
            value={currentRole}
            onChange={(e) => setRole(e.target.value as UserRole)}
          >
            {Object.entries(ROLE_LABELS).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>

          <button className="relative h-8 w-8 rounded border border-outline-variant bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors">
            <Bell size={16} />
            {activeAlerts > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-error text-on-error text-[10px] leading-none flex items-center justify-center font-bold">{activeAlerts}</span>
            )}
          </button>

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

          {/* Logout / Switch Role Button */}
          <button
            onClick={logout}
            title="Switch Operational Role / Logout"
            className="h-8 px-2.5 bg-surface-container-low hover:bg-[#ffdad6] text-[#ba1a1a] rounded border border-outline-variant text-[11px] font-bold transition-colors flex items-center gap-1 shadow-sm"
          >
            <LogOut size={13} />
            <span className="hidden md:inline">Switch Role</span>
          </button>
        </div>
      </div>
    </header>
  );
}
