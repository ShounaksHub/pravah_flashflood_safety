import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../hooks/useAppStore';
import MetricCard from '../components/ui/MetricCard';
import SectionHeader from '../components/ui/SectionHeader';
import GISMap from '../components/map/GISMap';
import CatchmentCascade from '../components/ui/CatchmentCascade';
import SectorRiskAnalysis from '../components/ui/SectorRiskAnalysis';
import NDRFDecisionEngine from '../components/ui/NDRFDecisionEngine';
import RoadAccessibilityTable from '../components/ui/RoadAccessibilityTable';
import ResourcesShelter from '../components/ui/ResourcesShelter';
import CitizenReportsQueue from '../components/ui/CitizenReportsQueue';
import SitRepGenerator from '../components/ui/SitRepGenerator';
import ScenarioControlPanel from '../components/ui/ScenarioControlPanel';
import { AlertTriangle, Activity, RefreshCw, Layers, Bell, CheckCircle } from 'lucide-react';
import { formatRelativeTime } from '../utils/formatting';

export default function CommandDashboard() {
  const navigate = useNavigate();
  const { villages, alerts, ndrfTeams, roads, sensors, acknowledgeAlert, resolveAlert, isSimulating, advanceSimulation } = useAppStore();

  const [scope, setScope] = useState<'all' | 'mawsynram' | 'sohra'>('all');
  const scopeCoords: Record<'all' | 'mawsynram' | 'sohra', { center: [number, number]; zoom: number }> = {
    all: { center: [25.30, 91.68], zoom: 10 },
    mawsynram: { center: [25.297, 91.582], zoom: 12 },
    sohra: { center: [25.274, 91.732], zoom: 12 },
  };

  const [layers, setLayers] = useState({
    flood: true,
    slope: true,
    radar: true,
    sensors: true,
    roads: false,
  });

  // Calculate KPIs dynamically from shared Zustand state
  const veryHighRiskVillages = villages.filter(v => v.riskLevel === 'VERY_HIGH');
  const highRiskVillages = villages.filter(v => v.riskLevel === 'HIGH');
  const criticalRoads = roads.filter(r => r.status === 'BLOCKED' || r.status === 'AT_RISK');
  const warningSensors = sensors.filter(s => s.status === 'warning' || s.value >= s.threshold);
  const dispatchedOrEnRouteTeams = ndrfTeams.filter(t => t.status === 'DEPLOYED' || t.status === 'EN_ROUTE');
  const activeAlertsList = alerts.filter(a => a.status === 'ACTIVE').sort((a, b) => new Date(b.issuedAt).getTime() - new Date(a.issuedAt).getTime());

  return (
    <div className="flex flex-col gap-4">
      {/* 0. FLASH-FLOOD SCENARIO SIMULATOR (EOC Interactive Controller) */}
      <ScenarioControlPanel />

      {/* 1. TOP KPI STRIP */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-3">
        <MetricCard
          label="Very High Risk"
          value={padZero(veryHighRiskVillages.length)}
          subtitle="Villages"
          badge={veryHighRiskVillages.length > 0 ? 'CRITICAL' : 'BASELINE'}
          badgeVariant={veryHighRiskVillages.length > 0 ? 'error' : undefined}
          accentColor="var(--color-error)"
          footer={veryHighRiskVillages.length > 0 ? `${veryHighRiskVillages[0].name}${veryHighRiskVillages.length > 1 ? ` +${veryHighRiskVillages.length - 1}` : ''}` : 'All Baseline'}
          footerAction="Triage →"
          onFooterClick={() => navigate('/risk')}
          pulse={veryHighRiskVillages.length > 0}
        />
        <MetricCard
          label="High Risk Villages"
          value={padZero(highRiskVillages.length)}
          subtitle="Sectors"
          badge={highRiskVillages.length > 2 ? 'ELEVATED' : 'MONITORED'}
          badgeVariant="info"
          accentColor="var(--color-secondary)"
          footer={highRiskVillages.length > 0 ? `${highRiskVillages[0].name}, ...` : 'None'}
          footerAction={`List (${highRiskVillages.length}) →`}
          onFooterClick={() => navigate('/risk')}
        />
        <MetricCard
          label="Critical Roads"
          value={padZero(criticalRoads.length)}
          subtitle="At Risk / Cut"
          badge={`${roads.filter(r => r.status === 'BLOCKED').length} BLOCKED`}
          badgeVariant={roads.some(r => r.status === 'BLOCKED') ? 'error' : criticalRoads.length > 0 ? 'warning' : undefined}
          accentColor="var(--color-error)"
          footer={roads.find(r => r.status === 'BLOCKED')?.name || (criticalRoads.length > 0 ? criticalRoads[0].name : 'All Passable')}
          footerAction="Detour →"
          onFooterClick={() => navigate('/roads')}
          pulse={roads.some(r => r.status === 'BLOCKED')}
        />
        <MetricCard
          label="Sensor Triggers"
          value={padZero(warningSensors.length)}
          subtitle={`/ ${sensors.length} Gauges`}
          icon={<Activity size={16} className="text-secondary" />}
          accentColor="var(--color-tertiary)"
          badge={warningSensors.length > 2 ? 'ELEVATED' : warningSensors.length > 0 ? 'WARNING' : 'NORMAL'}
          badgeVariant={warningSensors.length > 2 ? 'error' : warningSensors.length > 0 ? 'warning' : undefined}
          footer={warningSensors.length > 0 ? `${warningSensors[0].name} (${warningSensors[0].value} ${warningSensors[0].unit})` : 'All Normal'}
          footerAction="Telemetry →"
          onFooterClick={() => navigate('/system')}
          pulse={warningSensors.length > 0}
        />
        <MetricCard
          label="NDRF Dispatched / Ready"
          value={`${padZero(dispatchedOrEnRouteTeams.length)} / ${padZero(ndrfTeams.length)}`}
          subtitle="Units Mobilized / Staged"
          badge={dispatchedOrEnRouteTeams.length > 0 ? (dispatchedOrEnRouteTeams.some(t => t.status === 'EN_ROUTE') ? 'EN ROUTE' : 'DEPLOYED') : 'STANDBY'}
          badgeVariant={dispatchedOrEnRouteTeams.length > 0 ? 'error' : undefined}
          accentColor={dispatchedOrEnRouteTeams.length > 0 ? 'var(--color-error)' : 'var(--color-primary)'}
          footer={dispatchedOrEnRouteTeams.length > 0 ? `${dispatchedOrEnRouteTeams[0].name} (${dispatchedOrEnRouteTeams[0].currentLocation})` : 'All Units Staged (Standby)'}
          footerAction="Deploy →"
          onFooterClick={() => navigate('/ndrf')}
          pulse={dispatchedOrEnRouteTeams.length > 0}
        />
      </div>

      {/* 2. MAIN WORKSPACE */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-start">
        {/* LEFT COLUMN: GIS MAP & CATCHMENT (8 cols) */}
        <div className="xl:col-span-8 flex flex-col gap-4">
          <div className="bg-surface-container-lowest rounded border border-outline-variant shadow-sm flex flex-col">
            <SectionHeader
              icon={<Layers size={20} />}
              title="Geographical Information System | EOC East Khasi Hills"
            >
              <div className="flex items-center gap-2 flex-wrap">
                <label className="text-label-caps text-on-surface-variant">Scope:</label>
                <select 
                  value={scope} 
                  onChange={(e) => setScope(e.target.value as any)}
                  className="h-7 px-2 bg-surface-container-lowest border border-outline-variant rounded text-body-sm focus:outline-none focus:border-primary font-medium"
                >
                  <option value="all">All Blocks (Priority Focus)</option>
                  <option value="mawsynram">Mawsynram C&RD Block</option>
                  <option value="sohra">Sohra (Cherrapunji) Block</option>
                </select>
                <button 
                  onClick={advanceSimulation}
                  className="h-7 px-2.5 rounded bg-surface-container border border-outline-variant text-code-sm hover:bg-surface-container-high transition-colors flex items-center gap-1 active:scale-95"
                >
                  <RefreshCw size={14} className={isSimulating ? 'animate-spin' : ''} />
                  Simulate Tick
                </button>
              </div>
            </SectionHeader>
            
            {/* Layer Toggles */}
            <div className="px-2 py-1.5 bg-surface-container border-b border-outline-variant flex items-center gap-4 overflow-x-auto text-[11px]">
              <span className="text-label-caps font-bold whitespace-nowrap text-on-surface-variant">Active GIS Layers:</span>
              {Object.entries(layers).map(([key, value]) => (
                <label key={key} className="flex items-center gap-1 cursor-pointer whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={() => setLayers(prev => ({ ...prev, [key]: !prev[key as keyof typeof layers] }))}
                    className="rounded border-outline text-primary focus:ring-0 w-3.5 h-3.5"
                  />
                  <span className={value ? 'font-semibold text-primary capitalize' : 'text-on-surface capitalize'}>{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                </label>
              ))}
            </div>
            
            <GISMap 
              layers={layers} 
              center={scopeCoords[scope].center} 
              zoom={scopeCoords[scope].zoom} 
            />
          </div>

          <CatchmentCascade />
        </div>

        {/* RIGHT COLUMN: ACTION FEED, SECTOR, NDRF (4 cols) */}
        <div className="xl:col-span-4 flex flex-col gap-4">
          <SectorRiskAnalysis />
          
          <NDRFDecisionEngine />

          {/* Priority AI Alerts */}
          <div className="bg-surface-container-lowest rounded border border-outline-variant shadow-sm flex flex-col h-[320px]">
             <SectionHeader
              icon={<Bell size={18} />}
              title="Actionable Alerts"
              badge={`${activeAlertsList.length} PENDING`}
            />
            <div className="flex-1 overflow-y-auto p-2 flex flex-col gap-2">
              {activeAlertsList.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-on-surface-variant gap-2">
                   <CheckCircle size={32} className="text-tier1-text opacity-50" />
                   <p className="text-body-sm">No active critical alerts.</p>
                </div>
              ) : (
                activeAlertsList.map(alert => (
                  <div key={alert.id} className={`p-2 rounded border-l-4 shadow-sm flex flex-col gap-1.5
                    ${alert.severity === 'CRITICAL' ? 'bg-tier4-bg border-tier4-fill' : 
                      alert.severity === 'WARNING' ? 'bg-tier3-bg border-tier3-fill' : 
                      'bg-tier2-bg border-tier2-fill'}`}>
                    
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-1.5">
                        {alert.severity === 'CRITICAL' ? <AlertTriangle size={14} className="text-tier4-text animate-pulse" /> : <AlertTriangle size={14} className="text-tier3-text" />}
                        <span className={`text-code-sm font-bold ${alert.severity === 'CRITICAL' ? 'text-tier4-text' : 'text-tier3-text'}`}>{alert.type}</span>
                      </div>
                      <span className="text-[10px] text-on-surface-variant font-mono">{formatRelativeTime(alert.issuedAt)}</span>
                    </div>
                    
                    <h4 className="font-semibold text-body-md text-on-surface">{alert.title}</h4>
                    <p className="text-[11px] text-on-surface-variant leading-snug">{alert.description}</p>
                    
                    <div className="mt-1 pt-1.5 border-t border-outline-variant/30 flex justify-between items-center">
                      <span className="text-[10px] font-bold text-on-surface uppercase">Est. Lead: {alert.leadTimeMinutes}m</span>
                      <div className="flex items-center gap-1.5">
                        <button 
                          onClick={() => acknowledgeAlert(alert.id)}
                          className="px-2 py-0.5 rounded bg-surface-container-lowest text-code-sm font-semibold hover:bg-surface-container transition-colors border border-outline-variant text-primary"
                        >
                          Ack
                        </button>
                        <button 
                          onClick={() => resolveAlert(alert.id)}
                          className="px-2 py-0.5 rounded bg-surface-container-lowest text-code-sm font-semibold hover:bg-surface-container transition-colors border border-outline-variant text-on-surface-variant"
                        >
                          Resolve
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 3. LOWER MATRICES */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 h-80">
        <div className="xl:col-span-1">
          <RoadAccessibilityTable />
        </div>
        <div className="xl:col-span-1">
          <ResourcesShelter />
        </div>
        <div className="xl:col-span-1">
          <CitizenReportsQueue />
        </div>
        <div className="xl:col-span-1">
          <SitRepGenerator />
        </div>
      </div>
    </div>
  );
}

function padZero(num: number) {
  return num.toString().padStart(2, '0');
}
