import RoadAccessibilityTable from '../components/ui/RoadAccessibilityTable';
import { TrafficCone, Navigation, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useAppStore } from '../hooks/useAppStore';

export default function RoadsPage() {
  const { roads } = useAppStore();
  const blockedRoads = roads.filter(r => r.status === 'BLOCKED');
  const atRiskRoads = roads.filter(r => r.status === 'AT_RISK');

  return (
    <div className="flex flex-col gap-4">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 bg-surface-container-low p-3 rounded border border-outline-variant">
        <div>
          <h2 className="text-headline-sm uppercase tracking-tight text-primary font-bold flex items-center gap-2">
            <TrafficCone size={20} />
            Evacuation Route Accessibility & Road Blockage Clearance
          </h2>
          <p className="text-code-sm text-on-surface-variant">
            State PWD & BRO real-time corridor monitoring for landslide debris, culvert washouts, and active detours for emergency convoys.
          </p>
        </div>
        <div className="flex items-center gap-2 font-mono text-code-sm">
          <span className="px-2.5 py-1 rounded bg-error text-white font-bold">
            {blockedRoads.length} HIGHWAYS CUT / BLOCKED
          </span>
          <span className="px-2.5 py-1 rounded bg-[#ea580c] text-white font-bold">
            {atRiskRoads.length} AT RISK
          </span>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="flex flex-col gap-4">
        <RoadAccessibilityTable />

        {/* Tactical Detour Advisory */}
        <div className="bg-surface-container-lowest rounded border border-outline-variant p-4 shadow-sm flex flex-col gap-3">
          <div className="flex items-center gap-2 border-b border-outline-variant pb-2">
            <Navigation size={18} className="text-primary" />
            <h3 className="text-headline-sm font-bold text-on-surface">Active Detour Advisory: Mawsynram - Sohra Sector</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-error-container/10 border border-error/30 rounded flex flex-col gap-1 text-code-sm">
              <span className="font-bold text-error flex items-center gap-1">
                <AlertTriangle size={14} /> Critical Cut: SH-11 Km 18 (Landslide Debris)
              </span>
              <p className="text-on-surface">
                Heavy boulder debris covering 45m stretch of road. Single-lane movement strictly closed. Heavy JCB excavators deployed on site by PWD Division Sohra.
              </p>
              <span className="text-[11px] font-mono text-on-surface-variant mt-1">ESTIMATED RESTORATION: 24 - 48 HOURS</span>
            </div>

            <div className="p-3 bg-[#eff4ff] border border-outline-variant rounded flex flex-col gap-1 text-code-sm">
              <span className="font-bold text-primary flex items-center gap-1">
                <ShieldCheck size={14} /> Approved Green Corridor Detour
              </span>
              <p className="text-on-surface">
                All emergency relief and ambulance convoys rerouted via <strong>Mawkdok - Tyrna Bypass</strong>. Adds 22 km (+45 min transit time). Police pilot escort stationed at Mawkdok junction.
              </p>
              <span className="text-[11px] font-mono text-secondary font-bold mt-1">STATUS: FULLY OPEN FOR 4WD & LIGHT TRUCKS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
