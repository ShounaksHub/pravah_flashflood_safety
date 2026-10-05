import { useAppStore } from '../../hooks/useAppStore';
import { AlertTriangle, Info, Share2, Megaphone } from 'lucide-react';

export default function SectorRiskAnalysis() {
  const { villages } = useAppStore();
  
  // Use Mawsynram as the critical analysis target
  const target = villages.find(v => v.id === 'V001') || villages[0];

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

      <div className="p-3 flex flex-col gap-3">
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
            <span className="font-mono text-[20px] text-primary font-bold">142 mm/6h</span>
            <span className="font-mono text-[10px] text-primary font-semibold">Cloudburst Threshold</span>
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
          <button className="flex-1 h-8 bg-error hover:bg-[#991b1b] text-white rounded text-sm font-semibold transition-colors flex items-center justify-center gap-1 shadow-sm" onClick={() => alert('Evacuation Siren Triggered!')}>
            <Megaphone size={16} /> Issue Sector Red Alert
          </button>
          <button className="h-8 px-3 bg-surface-container-lowest border border-outline-variant hover:bg-surface-container rounded text-sm text-on-surface transition-colors flex items-center gap-1">
            <Share2 size={16} /> Relay SDMA
          </button>
        </div>
      </div>
    </div>
  );
}
