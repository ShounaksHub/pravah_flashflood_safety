import { useState } from 'react';
import CatchmentCascade from '../components/ui/CatchmentCascade';
import { Droplets, Waves, ArrowDownRight, Megaphone, CheckCircle2 } from 'lucide-react';

export default function CatchmentPage() {
  const [broadcastSent, setBroadcastSent] = useState(false);

  const handleBroadcast = () => {
    setBroadcastSent(true);
    setTimeout(() => setBroadcastSent(false), 3500);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 bg-surface-container-low p-3 rounded border border-outline-variant">
        <div>
          <h2 className="text-headline-sm uppercase tracking-tight text-primary font-bold flex items-center gap-2">
            <Droplets size={20} />
            Catchment Basin & Downstream Hydrological Cascade
          </h2>
          <p className="text-code-sm text-on-surface-variant">
            Kinematic wave flood surge routing from high-altitude cloudburst ridges down through steep gorges to downstream floodplain villages.
          </p>
        </div>
        <div className="flex items-center gap-2 font-mono text-code-sm">
          <span className="px-2.5 py-1 rounded bg-primary text-white font-bold">
            WAHREW SUB-BASIN #03 ACTIVE
          </span>
        </div>
      </div>

      {broadcastSent && (
        <div className="p-3 bg-[#dcfce7] border border-[#86efac] text-[#166534] rounded text-body-sm font-semibold flex items-center gap-2">
          <CheckCircle2 size={18} />
          Pre-emptive early warning siren & SMS triggered for downstream Shella & Bholaganj sectors! (Lead time: 70 min)
        </div>
      )}

      {/* Main Cascade Component */}
      <CatchmentCascade />

      {/* Basin Hydrological Context & Action */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-surface-container-lowest rounded border border-outline-variant p-4 shadow-sm flex flex-col gap-2">
          <div className="flex items-center gap-2 border-b border-outline-variant pb-2">
            <Waves size={18} className="text-primary" />
            <h3 className="text-headline-sm font-bold text-on-surface">Basin Geomorphic Velocity Profile</h3>
          </div>
          <p className="text-code-sm text-on-surface-variant leading-relaxed">
            The Wahrew river basin drains 184 km² of rugged southern Meghalaya plateau. Rainfall exceeding 40 mm/hr on upper escarpments generates flash runoff traveling at <strong>3.8 m/s</strong> through narrow rock defiles, producing severe downstream surge waves within 45 to 90 minutes.
          </p>
          <div className="grid grid-cols-3 gap-2 text-code-sm bg-surface-container-low p-2.5 rounded mt-2">
            <div>Peak Discharge: <strong className="text-primary block">620 m³/s</strong></div>
            <div>Basin Retention: <strong className="text-error block">12% (Saturated)</strong></div>
            <div>Surge Height: <strong className="text-error block">+2.4 m</strong></div>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded border border-outline-variant p-4 shadow-sm flex flex-col justify-between gap-3">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 border-b border-outline-variant pb-2">
              <ArrowDownRight size={18} className="text-error" />
              <h3 className="text-headline-sm font-bold text-on-surface">Downstream Early Action Protocol</h3>
            </div>
            <p className="text-code-sm text-on-surface leading-relaxed">
              When upstream peak discharge breaches critical threshold at Wahrew Bridge, statutory protocol mandates immediate evacuation of low-lying settlements in <strong>Shella, Bholaganj, and Balat</strong> before river flood crest reaches river mouth.
            </p>
          </div>

          <button
            onClick={handleBroadcast}
            className="w-full h-9 bg-primary hover:bg-blue-900 text-white font-bold rounded text-body-sm shadow transition-colors flex items-center justify-center gap-2"
          >
            <Megaphone size={16} />
            Broadcast Downstream Cascade Warning
          </button>
        </div>
      </div>
    </div>
  );
}
