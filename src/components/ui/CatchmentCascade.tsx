import { useState, useEffect } from 'react';
import { Waves, AlarmClock, Activity, MapPin } from 'lucide-react';
import { useAppStore } from '../../hooks/useAppStore';

const NODES_DATA = [
  {
    id: 0,
    title: 'Wahrew Upper Reach',
    category: 'Upstream Trigger',
    time: 'Phase 0-1 Runoff',
    color: 'border-primary text-primary',
    badgeBg: 'bg-primary text-white',
    details: 'Upper catchment cloudburst runoff initiated. Rate: 42-68mm/hr. Sheet wash into upper Wahrew gorges.',
    metrics: { level: '2.80 m', change: '+0.4m/hr', sensor: 'AWS-WAH-01 (100% Online)', discharge: '420 m³/s' },
  },
  {
    id: 1,
    title: 'River Gauge Gorge',
    category: 'Catchment Funnel',
    time: 'Phase 2 Surge',
    color: 'border-[#d97706] text-[#b45309]',
    badgeBg: 'bg-[#d97706] text-white',
    details: 'Narrow mountain gorge constriction. Surge velocity accelerates to 4.2 m/s. Topsoil fully saturated (86%).',
    metrics: { level: '3.65 m', change: '+0.8m/hr', sensor: 'SMAP Saturation: 86%', discharge: '780 m³/s' },
  },
  {
    id: 2,
    title: 'Mawsynram Lowlands',
    category: 'Impact Zone A-1',
    time: 'Phase 3 Peak',
    color: 'border-error text-error',
    badgeBg: 'bg-error text-on-error',
    details: 'Lowland causeway overtopping projected in 22 min. 4,200 villagers exposed. Evacuation window active.',
    metrics: { level: '4.95 m (DANGER)', change: '+1.4m/hr', sensor: 'Causeway Depth Cam', discharge: '1,240 m³/s' },
  },
  {
    id: 3,
    title: 'Shella Border Plains',
    category: 'Downstream Plains',
    time: 'Downstream Warning',
    color: 'border-secondary text-secondary',
    badgeBg: 'bg-surface-container text-on-surface-variant',
    details: 'River surge propagates toward international border floodplain. SDMA liaison notified. Relief shelters on standby.',
    metrics: { level: '2.10 m', change: '+0.2m/hr', sensor: 'Downstream Stn #4', discharge: '890 m³/s' },
  },
];

export default function CatchmentCascade() {
  const { catchmentActiveStage, scenarioPhase } = useAppStore();
  const [selectedNode, setSelectedNode] = useState<number>(catchmentActiveStage);

  useEffect(() => {
    setSelectedNode(catchmentActiveStage);
  }, [catchmentActiveStage]);

  const active = NODES_DATA[selectedNode] || NODES_DATA[0];

  const surgeTimeBadge = 
    scenarioPhase === 0 ? 'SURGE ETA: ~112 MIN' :
    scenarioPhase === 1 ? 'SURGE ADVANCING: 72 MIN' :
    scenarioPhase === 2 ? 'PEAK SURGE IN 38 MIN' :
    'CRITICAL INUNDATION: 22 MIN';

  return (
    <div className="bg-surface-container-lowest rounded border border-outline-variant shadow-sm p-4 flex flex-col gap-3">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-outline-variant pb-2">
        <div className="flex items-center gap-2">
          <Waves className="text-primary" size={20} />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-headline-sm uppercase tracking-tight text-on-surface font-semibold">
                Catchment Cascade & Hydrological Propagation Timeline (Wahrew Sub-Basin)
              </h3>
              <span className="px-1.5 py-0.5 rounded bg-surface-container text-[10px] font-mono text-on-surface-variant border border-outline-variant font-bold">
                SIMULATED PROPAGATION
              </span>
            </div>
            <p className="text-code-sm text-on-surface-variant font-mono text-[11px]">
              Prototype Kinematic Wave Model • Active Stage: {NODES_DATA[catchmentActiveStage]?.title} • Click any node to inspect
            </p>
          </div>
        </div>
        <div className={`flex items-center gap-1 font-mono text-code-sm px-2.5 py-1 rounded border font-bold ${
          scenarioPhase >= 2 
            ? 'bg-error-container text-on-error-container border-error animate-pulse'
            : 'bg-surface-container text-on-surface border-outline-variant'
        }`}>
          <AlarmClock size={16} />
          <span>{surgeTimeBadge}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 relative pt-1">
        {NODES_DATA.map((node) => {
          const isSelected = selectedNode === node.id;
          return (
            <div
              key={node.id}
              onClick={() => setSelectedNode(node.id)}
              className={`rounded border-l-4 p-3 border cursor-pointer transition-all flex flex-col justify-between ${
                node.color
              } ${
                isSelected
                  ? 'bg-surface-container ring-2 ring-primary shadow-md border-primary'
                  : 'bg-surface-container-low border-outline-variant hover:bg-surface-container/70'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider">{node.category}</span>
                <span className={`px-1.5 py-0.5 rounded font-mono text-[10px] font-bold ${node.badgeBg}`}>
                  {node.time}
                </span>
              </div>
              <div className="my-2">
                <div className="text-body-sm font-bold text-on-surface">{node.title}</div>
                <div className="font-mono text-[11px] font-bold">{node.metrics.level}</div>
                <div className="font-mono text-[10px] text-on-surface-variant truncate">{node.metrics.change}</div>
              </div>
              <div className="text-[10px] font-mono text-on-surface-variant border-t border-surface-container pt-1 truncate">
                {node.metrics.sensor}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Node Real-Time Inspection Card */}
      <div className="p-3 bg-surface-container-low rounded border border-outline-variant flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-code-sm">
        <div className="flex items-start gap-2.5">
          <Activity size={18} className="text-primary mt-0.5 flex-shrink-0" />
          <div className="flex flex-col">
            <span className="font-bold text-on-surface flex items-center gap-1.5">
              <MapPin size={13} className="text-primary" /> {active.title} — Active Hydrological Cross-Section
            </span>
            <p className="text-on-surface-variant text-[12px]">{active.details}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 font-mono text-[11px] bg-surface-container-lowest px-3 py-1.5 rounded border border-outline-variant flex-shrink-0">
          <div>Peak Discharge: <strong className="text-primary">{active.metrics.discharge}</strong></div>
          <div className="text-outline-variant">|</div>
          <div>Stage: <strong className="text-error">{active.metrics.level}</strong></div>
        </div>
      </div>
    </div>
  );
}
