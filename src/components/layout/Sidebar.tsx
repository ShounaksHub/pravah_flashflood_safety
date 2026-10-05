import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Map, CloudRain, Activity, ShieldAlert, Package, TrafficCone, Droplets, Megaphone, FileText, MessageSquareWarning, Radio, Settings, Lock } from 'lucide-react';
import { APP_VERSION, HELPLINE } from '../../data/constants';
import { useAppStore } from '../../hooks/useAppStore';

const navItems = [
  { path: '/command', label: 'Command Overview', icon: LayoutDashboard },
  { path: '/map', label: 'Live Risk Map & GIS', icon: Map },
  { path: '/forecast', label: 'Flood & Slope Forecast', icon: CloudRain },
  { path: '/risk', label: 'Risk Assessment', icon: Activity },
  { path: '/ndrf', label: 'NDRF Deployment Priority', icon: ShieldAlert },
  { path: '/resources', label: 'Resource Allocation', icon: Package },
  { path: '/roads', label: 'Road Accessibility', icon: TrafficCone },
  { path: '/catchment', label: 'Catchment Propagation', icon: Droplets },
  { path: '/alerts', label: 'Alert Center', icon: Megaphone },
  { path: '/sitrep', label: 'SitRep Generator', icon: FileText },
  { path: '/reports', label: 'Citizen Ground Reports', icon: MessageSquareWarning },
  { path: '/system', label: 'System Feeds & Health', icon: Radio },
];

const adminItems = [
  { path: '/admin', label: 'Admin Dashboard', icon: Settings },
];

export default function Sidebar() {
  const { currentRole, currentUser } = useAppStore();
  const showAdmin = currentRole === 'ADMIN';

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-72 bg-surface-container-lowest border-r border-outline-variant z-40 flex flex-col justify-between overflow-hidden">
      <div className="flex-1 flex flex-col min-h-0">
        {/* Header */}
        <div className="p-2 border-b border-outline-variant bg-surface-container-low flex items-center justify-between">
          <span className="text-label-caps text-on-surface-variant tracking-wider">Tactical Consoles</span>
          <span className="text-code-sm text-on-surface-variant">{APP_VERSION}</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-1 flex flex-col gap-0.5">
          {navItems.map(({ path, label, icon: Icon }) => {
            const isRestricted = currentUser && currentUser.allowedRoutes && !currentUser.allowedRoutes.includes(path);

            return (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `flex items-center justify-between px-2.5 py-2 rounded transition-colors ${
                    isActive
                      ? 'bg-primary-container text-on-primary-container font-semibold border-l-4 border-primary shadow-sm'
                      : isRestricted
                      ? 'text-on-surface-variant/60 hover:bg-surface-container hover:text-on-surface text-body-sm'
                      : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface text-body-sm'
                  }`
                }
              >
                <div className="flex items-center min-w-0">
                  <Icon size={16} className="mr-2.5 flex-shrink-0" />
                  <span className="truncate">{label}</span>
                </div>
                {isRestricted && (
                  <span className="flex items-center gap-1 text-[9px] font-mono uppercase bg-[#fee2e2] text-[#991b1b] px-1.5 py-0.2 rounded border border-[#fca5a5]">
                    <Lock size={9} /> Restricted
                  </span>
                )}
              </NavLink>
            );
          })}

          {showAdmin && (
            <>
              <div className="my-1 border-t border-outline-variant" />
              {adminItems.map(({ path, label, icon: Icon }) => (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) =>
                    `flex items-center px-2.5 py-2 rounded transition-colors ${
                      isActive
                        ? 'bg-primary-container text-on-primary-container font-semibold border-l-4 border-primary shadow-sm'
                        : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface text-body-sm'
                    }`
                  }
                >
                  <Icon size={16} className="mr-2.5 flex-shrink-0" />
                  <span className="truncate">{label}</span>
                </NavLink>
              ))}
            </>
          )}
        </nav>
      </div>

      {/* Footer: Logged operator */}
      <div className="border-t border-outline-variant p-2 bg-surface-container-low flex flex-col gap-1.5">
        <div className="flex flex-col">
          <span className="text-label-caps text-on-surface-variant">Logged Operator</span>
          <span className="text-body-sm font-semibold text-on-surface truncate">
            {currentUser?.name || 'Shri R. Lyngdoh, IAS'}
          </span>
          <span className="text-code-sm text-on-surface-variant truncate">
            {currentUser?.designation || 'District Emergency Officer'}
          </span>
          <span className="text-code-sm text-primary font-medium truncate">
            {currentUser?.department || 'DDMA East Khasi Hills'}
          </span>
        </div>
        <div className="pt-1 border-t border-outline-variant flex items-center justify-between text-code-sm">
          <span className="text-on-surface-variant">HELPLINE:</span>
          <span className="font-bold text-error">{HELPLINE}</span>
        </div>
      </div>
    </aside>
  );
}
