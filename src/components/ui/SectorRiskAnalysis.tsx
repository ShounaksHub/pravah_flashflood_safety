import { useState } from 'react';
import { useAppStore } from '../../hooks/useAppStore';
import { AlertTriangle, Info, Share2, Megaphone, CheckCircle2, Volume2 } from 'lucide-react';
import type { Alert } from '../../types/alerts';

export default function SectorRiskAnalysis() {
  const { villages, addAlert, currentUser, sensors } = useAppStore();
  const [sirenActive, setSirenActive] = useState(false);
  const [sdmaRelayed, setSdmaRelayed] = useState(false);
  const [actionRecorded, setActionRecorded] = useState<string | null>(null);
  
  // Use Mawsynram as the critical analysis target
  const target = villages.find(v => v.id === 'V001') || villages[0];
  const mawsynramRainSensor = sensors.find(s => s.id === 'RS-01' || s.name.toLowerCase().includes('mawsynram'));

  const handleIssueRedAlert = () => {
    const newAlert: Alert = {
      id: `ALT-CRIT-${Date.now().toString().slice(-4)}`,
      severity: 'CRITICAL',
      type: 'FLASH_FLOOD',
      title: `SECTOR RED ALERT: Flash Surge at ${target.name}`,
      description: `Critical runoff approaching ${target.name} basin. Acoustic sirens triggered. Immediate evacuation required.`,
      location: `${target.name} Basin / Wahrew Stream`,
      block: target.block || 'Mawsynram',
      latitude: target.latitude,
      longitude: target.longitude,
      issuedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 6 * 3600000).toISOString(),
      leadTimeMinutes: target.leadTimeMinutes,
      affectedPopulation: target.populationExposure,
      recommendedAction: 'Immediate low-lying evacuation. Deploy swiftwater rescue teams.',
      status: 'ACTIVE',
      source: currentUser ? `${currentUser.name} (${currentUser.role})` : 'Incident Commander',
    };

    addAlert(newAlert);
    setSirenActive(true);
    setTimeout(() => setSirenActive(false), 5000);
  };

  const handleRelaySDMA = () => {
    setSdmaRelayed(true);
    setTimeout(() => setSdmaRelayed(false), 4000);
  };

  return (
    <div className="bg-surface-container-lowest rounded border border-outline-variant shadow-sm overflow-hidden flex flex-col">
      <div className="p-3 bg-surface-container-low border-b border-outline-variant flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertTriangle className="text-error" size={18} />
          <span className="text-headline-sm uppercase text-on-surface font-semibold tracking-tight">Sector Analysis</span>
        </div>
        <span className="px-2 py-0.5 rounded bg-error text-on-error font-mono text-[10px] font-bold animate-pulse uppercase">
          Evacuation Advisory
        </span>
      </div>
      <div className="px-3 pb-2 pt-1 bg-surface-container-low border-b border-outline-variant">
        <p className="font-mono text-[10px] text-on-surface-variant leading-tight">
          PRAVAH Explainable Prototype Risk Engine • Dynamic Telemetry Computation
        </p>
      </div>

      <div className="p-3 flex flex-col gap-3">
        {sirenActive && (
          <div className="p-2.5 bg-[#fee2e2] border border-[#f87171] text-[#991b1b] rounded text-body-sm font-semibold flex items-center gap-2 animate-bounce">
            <Volume2 size={18} className="animate-spin text-error" />
            <span>SIREN ACTIVE (120dB) • CAP Evacuation Alert Broadcasted to {target.name} lowlands!</span>
          </div>
        )}

        {sdmaRelayed && (
          <div className="p-2.5 bg-[#dcfce7] border border-[#86efac] text-[#166534] rounded text-body-sm font-semibold flex items-center gap-2">
            <CheckCircle2 size={16} />
            <span>Radar Reflectivity & Telemetry Packet Relayed to SEOC & SDMA Shillong!</span>
          </div>
        )}

        <div>
          <div className="text-headline-sm font-bold text-on-surface">{target.name} Cluster (Ward 2 & 4)</div>
          <div className="font-mono text-code-sm text-on-surface-variant">Administrative Division: {target.district}</div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-2">
          <div className="p-2 bg-surface-container-low rounded border border-outline-variant flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">Flash Flood Prob.</span>
            <span className="font-mono text-[20px] text-error font-bold">{(target.floodProbability * 100).toFixed(0)}%</span>
            <span className="font-mono text-[10px] text-error font-semibold">Critical Threshold</span>
          </div>
          <div className="p-2 bg-surface-container-low rounded border border-outline-variant flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">Slope Failure Risk</span>
            <span className="font-mono text-[20px] text-[#b45309] font-bold">{(target.slopeProbability * 100).toFixed(0)}%</span>
            <span className="font-mono text-[10px] text-[#b45309] font-semibold">Warning (Zone 4)</span>
          </div>
          <div className="p-2 bg-surface-container-low rounded border border-outline-variant flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">Rainfall Rate (AWS)</span>
            <span className="font-mono text-[20px] text-primary font-bold">
              {mawsynramRainSensor ? `${mawsynramRainSensor.value} mm/hr` : '42 mm/hr'}
            </span>
            <span className={`font-mono text-[10px] font-semibold ${
              (mawsynramRainSensor?.value || 0) >= 100 
                ? 'text-error font-bold' 
                : (mawsynramRainSensor?.value || 0) >= 60 
                ? 'text-[#b45309]' 
                : 'text-primary'
            }`}>
              {(mawsynramRainSensor?.value || 0) >= 100 ? 'Cloudburst Exceeded' : (mawsynramRainSensor?.value || 0) >= 60 ? 'Intense Downpour' : 'Steady Inundation'}
            </span>
          </div>
          <div className="p-2 bg-surface-container-low rounded border border-outline-variant flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">Est. Lead Time</span>
            <span className="font-mono text-[20px] text-error font-bold">{target.leadTimeMinutes} min</span>
            <span className="font-mono text-[10px] text-on-surface-variant">To Inundation Peak</span>
          </div>
        </div>

        {/* Briefing */}
        <div className="p-3 bg-surface-container rounded border-l-4 border-primary flex flex-col gap-1">
          <div className="text-[10px] uppercase text-primary font-bold flex items-center gap-1">
            <Info size={14} /> Duty Officer Situation Briefing
          </div>
          <p className="text-[12px] leading-relaxed text-on-surface">
            "Intense convective cloudburst localized over {target.name} ridge. Upper soil horizon fully saturated; rainwater cannot infiltrate, creating immediate sheet-wash runoff. Downstream inundation expected within {target.leadTimeMinutes} minutes."
          </p>
        </div>

        <div className="flex items-center gap-2 pt-1">
          <button 
            className="flex-1 h-8 bg-error hover:bg-[#991b1b] text-white rounded text-sm font-semibold transition-colors flex items-center justify-center gap-1 shadow-sm active:scale-95" 
            onClick={() => {
              handleIssueRedAlert();
              setActionRecorded('Sector red alert recorded in Alert Center & Siren broadcasted.');
            }}
          >
            <Megaphone size={16} /> Issue Sector Red Alert
          </button>
          <button 
            onClick={() => {
              handleRelaySDMA();
              setActionRecorded('SDMA telemetry relay recorded and sent to State EOC.');
            }}
            className="h-8 px-3 bg-surface-container-lowest border border-outline-variant hover:bg-surface-container rounded text-sm text-on-surface transition-colors flex items-center gap-1 active:scale-95"
          >
            <Share2 size={16} /> Relay SDMA
          </button>
        </div>
      </div>
      {actionRecorded && <div className="mx-3 mb-3 p-2 bg-[#dcfce7] border border-[#86efac] text-[#166534] rounded text-[11px] font-semibold flex items-center gap-1.5"><CheckCircle2 size={13} />{actionRecorded}</div>}
    </div>
  );
}
