import { Waves, AlarmClock } from 'lucide-react';

export default function CatchmentCascade() {

  return (
    <div className="bg-surface-container-lowest rounded border border-outline-variant shadow-sm p-4 flex flex-col gap-3">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-outline-variant pb-2">
        <div className="flex items-center gap-2">
          <Waves className="text-primary" size={20} />
          <div>
            <h3 className="text-headline-sm uppercase tracking-tight text-on-surface font-semibold">
              Catchment Cascade & Hydrological Propagation Timeline (Wahrew Catchment)
            </h3>
            <p className="text-code-sm text-on-surface-variant font-mono text-[11px]">
              Model: Prototype hydrological propagation simulation | Validation: Demonstration / target only
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 font-mono text-code-sm px-2 py-1 rounded bg-error-container text-on-error-container border border-error font-bold">
          <AlarmClock size={16} />
          <span>PEAK SURGE IN 35 MIN</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 relative pt-1">
        {/* Node 1 */}
        <div className="bg-surface-container-low rounded border-l-4 border-error p-3 border border-outline-variant flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase text-error tracking-wider">Upstream Trigger</span>
            <span className="px-1.5 py-0.5 rounded bg-error text-on-error font-mono text-[10px] font-bold">11:25 AM</span>
          </div>
          <div className="my-2">
            <div className="text-body-sm font-bold text-on-surface">Wahrew Upper Reach</div>
            <div className="font-mono text-[11px] text-error font-bold">Level: 2.80 m (+0.4m/hr)</div>
            <div className="font-mono text-[11px] text-on-surface-variant">Inflow Surge Detected</div>
          </div>
          <div className="text-[10px] font-mono text-on-surface-variant border-t border-surface-container pt-1">
            Sensor #A: SIMULATED STREAM
          </div>
        </div>

        {/* Node 2 */}
        <div className="bg-surface-container-low rounded border-l-4 border-[#d97706] p-3 border border-outline-variant flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase text-[#b45309] tracking-wider">Catchment Funnel</span>
            <span className="font-mono text-[10px] text-on-surface-variant">11:38 AM</span>
          </div>
          <div className="my-2">
            <div className="text-body-sm font-bold text-on-surface">River Gauge Gorge</div>
            <div className="font-mono text-[11px] text-on-surface font-semibold">Saturation: 82% (SIMULATED)</div>
            <div className="font-mono text-[11px] text-[#b45309] font-semibold">Surge Velocity: 4.2 m/s</div>
          </div>
          <div className="text-[10px] font-mono text-on-surface-variant border-t border-surface-container pt-1">
            Runoff Coefficient: 0.91
          </div>
        </div>

        {/* Node 3 (Impact) */}
        <div className="bg-error-container/30 rounded border-2 border-error p-3 flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase text-error tracking-wider">Impact Zone A-1</span>
            <span className="px-1.5 py-0.5 rounded bg-error text-on-error font-mono text-[10px] font-bold">ETA: 35 MIN</span>
          </div>
          <div className="my-2">
            <div className="text-body-sm font-bold text-error">Mawsynram Lowlands</div>
            <div className="font-mono text-[11px] text-on-error-container font-bold">Projected Peak: 12:17 PM</div>
            <div className="text-[12px] font-bold text-on-surface">Pop at Risk: 4,200 Persons</div>
          </div>
          <div className="text-[10px] font-mono text-error font-bold border-t border-error/30 pt-1">
            CRITICAL: Bridge Causeway Overtopping
          </div>
        </div>

        {/* Node 4 */}
        <div className="bg-surface-container-low rounded border-l-4 border-secondary p-3 border border-outline-variant flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase text-secondary tracking-wider">Downstream Plains</span>
            <span className="px-1.5 py-0.5 rounded bg-surface-container text-on-surface-variant font-mono text-[10px] font-semibold">ETA: 52 MIN</span>
          </div>
          <div className="my-2">
            <div className="text-body-sm font-bold text-on-surface">Shella Border Plains</div>
            <div className="font-mono text-[11px] text-on-surface font-semibold">Projected Peak: 12:34 PM</div>
            <div className="text-[12px] text-on-surface-variant">Pop at Risk: 1,850 Persons</div>
          </div>
          <div className="text-[10px] font-mono text-on-surface-variant border-t border-surface-container pt-1">
            Downstream warning path simulated
          </div>
        </div>
      </div>
    </div>
  );
}
