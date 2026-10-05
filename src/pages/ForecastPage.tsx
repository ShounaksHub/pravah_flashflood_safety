import { useState } from 'react';
import { useAppStore } from '../hooks/useAppStore';
import SectionHeader from '../components/ui/SectionHeader';
import { CloudRain, Waves, Mountain, Clock, TrendingUp, AlertTriangle } from 'lucide-react';
import { formatTime } from '../utils/formatting';

export default function ForecastPage() {
  const { villages, sensors, lastSync } = useAppStore();
  const [selectedLeadTime, setSelectedLeadTime] = useState<number>(30); // minutes

  const leadTimes = [
    { label: 'Now (T+0)', minutes: 0 },
    { label: '+15 Min', minutes: 15 },
    { label: '+30 Min', minutes: 30 },
    { label: '+45 Min', minutes: 45 },
    { label: '+60 Min', minutes: 60 },
    { label: '+90 Min', minutes: 90 },
    { label: '+120 Min (2h)', minutes: 120 },
  ];

  // River telemetry
  const riverSensors = sensors.filter(s => s.type === 'river');
  const rainSensors = sensors.filter(s => s.type === 'rainfall');

  return (
    <div className="flex flex-col gap-4">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 bg-surface-container-low p-3 rounded border border-outline-variant">
        <div>
          <h2 className="text-headline-sm uppercase tracking-tight text-primary font-bold flex items-center gap-2">
            <CloudRain size={20} />
            Flood & Slope Failure Early Warning Forecast
          </h2>
          <p className="text-code-sm text-on-surface-variant">
            Hydrological runoff modeling and geotechnical slope stability forecast with 15 min to 2 hour lead-time precision.
          </p>
        </div>
        <div className="flex items-center gap-2 text-code-sm">
          <span className="px-2.5 py-1 rounded bg-error-container text-on-error-container border border-error font-semibold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-error animate-ping" />
            HIGH RAINFALL ADVISORY (IMD AWS)
          </span>
          <span className="text-on-surface-variant font-mono">CYCLE: {formatTime(lastSync)} IST</span>
        </div>
      </div>

      {/* Lead-Time Timeline Controller */}
      <div className="bg-surface-container-lowest p-3 rounded border border-outline-variant shadow-sm flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-primary" />
            <span className="text-label-caps font-bold text-on-surface">Forecast Projection Horizon:</span>
          </div>
          <span className="text-code-sm font-bold text-primary font-mono">
            {selectedLeadTime === 0 ? 'CURRENT OBSERVATIONS' : `PROJECTED CONDITIONS AT T+${selectedLeadTime} MINUTES`}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-1.5">
          {leadTimes.map((lt) => {
            const isSelected = selectedLeadTime === lt.minutes;
            return (
              <button
                key={lt.minutes}
                onClick={() => setSelectedLeadTime(lt.minutes)}
                className={`py-2 px-3 rounded text-center transition-all border ${
                  isSelected
                    ? 'bg-primary text-white border-primary shadow font-bold'
                    : 'bg-surface-container-low text-on-surface border-outline-variant hover:bg-surface-container'
                }`}
              >
                <div className="text-[12px] font-semibold">{lt.label}</div>
                <div className="text-[10px] font-mono opacity-80">
                  {lt.minutes === 0 ? 'Radar Ground Truth' : lt.minutes <= 45 ? 'Flash Evac Window' : 'Pre-positioning'}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Row: River Stage Hydrographs & Slope Saturation Tiers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* River Stage & Discharge Telemetry */}
        <div className="bg-surface-container-lowest rounded border border-outline-variant shadow-sm flex flex-col">
          <SectionHeader
            icon={<Waves size={18} />}
            title="River Catchment Stages vs Warning / Danger Marks"
            badge="CWC NETWORK"
          />
          <div className="p-3 flex flex-col gap-3">
            {riverSensors.map((river) => {
              const dangerMark = river.threshold;
              const warningMark = dangerMark * 0.85;
              const projectedValue = +(river.value + (selectedLeadTime / 60) * 0.4).toFixed(1);
              const percent = Math.min(100, Math.round((projectedValue / dangerMark) * 100));
              const isBreached = projectedValue >= dangerMark;
              const isWarning = projectedValue >= warningMark;

              return (
                <div key={river.id} className="p-3 rounded border border-outline-variant bg-surface-container-low flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-body-sm font-bold text-on-surface">{river.name}</span>
                      <span className="text-code-sm text-on-surface-variant block">{river.location} ({river.block})</span>
                    </div>
                    <div className="text-right">
                      <span className={`text-headline-sm font-mono font-bold ${isBreached ? 'text-error' : isWarning ? 'text-[#ea580c]' : 'text-primary'}`}>
                        {projectedValue} m
                      </span>
                      <span className="text-code-sm text-on-surface-variant block">Danger Mark: {dangerMark} m</span>
                    </div>
                  </div>

                  {/* Visual Bar Gauge */}
                  <div className="relative w-full h-4 bg-surface-container rounded-full overflow-hidden border border-outline-variant">
                    <div 
                      className={`h-full transition-all duration-300 ${
                        isBreached ? 'bg-error' : isWarning ? 'bg-[#ea580c]' : 'bg-primary'
                      }`}
                      style={{ width: `${percent}%` }}
                    />
                    {/* Warning mark pin at 85% */}
                    <div className="absolute top-0 bottom-0 left-[85%] w-0.5 bg-[#ca8a04]" title="Warning Mark" />
                  </div>

                  <div className="flex items-center justify-between text-code-sm">
                    <span className="text-on-surface-variant">Rate of Rise: <strong>+0.4 m/hr</strong></span>
                    <span className={`font-semibold ${isBreached ? 'text-error' : isWarning ? 'text-[#ea580c]' : 'text-[#16a34a]'}`}>
                      {isBreached ? 'PROJECTED BREACH (EVACUATE)' : isWarning ? 'WARNING THRESHOLD EXCEEDED' : 'WITHIN SAFE CAPACITY'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Slope Failure & Geotechnical Saturation */}
        <div className="bg-surface-container-lowest rounded border border-outline-variant shadow-sm flex flex-col">
          <SectionHeader
            icon={<Mountain size={18} />}
            title="Geotechnical Slope Stability & Soil Saturation"
            badge="GEOMORPHIC"
          />
          <div className="p-3 flex flex-col gap-3">
            <div className="p-3 bg-surface-container-low rounded border border-outline-variant flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-body-sm font-bold text-on-surface">Tyrsad - Mawsynram Escarpment Corridor</span>
                <span className="px-2 py-0.5 rounded bg-error text-white font-mono text-[10px] font-bold">92% SATURATED</span>
              </div>
              <p className="text-code-sm text-on-surface-variant">
                Slope gradient &gt;35° with active pore-water pressure accumulation. Critical slip circle failure threshold reached near SH-11 Km 18.
              </p>
              <div className="grid grid-cols-3 gap-2 text-code-sm bg-surface-container p-2 rounded">
                <div>Slope: <strong className="text-on-surface">38° (Steep)</strong></div>
                <div>Soil Type: <strong className="text-on-surface">Lateritic Clay</strong></div>
                <div>Factor of Safety: <strong className="text-error font-bold">0.94 (&lt;1.0)</strong></div>
              </div>
            </div>

            <div className="p-3 bg-surface-container-low rounded border border-outline-variant flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-body-sm font-bold text-on-surface">Sohra Gorge / Mawlynnong Slopes</span>
                <span className="px-2 py-0.5 rounded bg-[#ea580c] text-white font-mono text-[10px] font-bold">78% SATURATED</span>
              </div>
              <p className="text-code-sm text-on-surface-variant">
                Moderate-to-high risk. Debris slide triggers expected if rainfall exceeds 30 mm/hr continuously for another 45 minutes.
              </p>
              <div className="grid grid-cols-3 gap-2 text-code-sm bg-surface-container p-2 rounded">
                <div>Slope: <strong className="text-on-surface">26°</strong></div>
                <div>Soil Type: <strong className="text-on-surface">Sandstone Silt</strong></div>
                <div>Factor of Safety: <strong className="text-[#ea580c] font-bold">1.18 (Marginal)</strong></div>
              </div>
            </div>

            {/* AWS Rain Gauges Summary */}
            <div className="p-2.5 bg-surface-container rounded border border-outline-variant flex items-center justify-between text-code-sm">
              <div className="flex items-center gap-1.5">
                <TrendingUp size={14} className="text-primary" />
                <span className="font-semibold text-on-surface">Active AWS Rain Gauges:</span>
              </div>
              <div className="flex items-center gap-2">
                {rainSensors.map(r => (
                  <span key={r.id} className="px-1.5 py-0.5 bg-surface-container-lowest rounded border border-outline-variant font-mono text-[11px]">
                    {r.location.split(' ')[0]}: <strong>{r.value} mm/h</strong>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Village Forecast & Lead-Time Matrix Table */}
      <div className="bg-surface-container-lowest rounded border border-outline-variant shadow-sm flex flex-col">
        <SectionHeader
          icon={<AlertTriangle size={18} />}
          title={`Hyper-Local Forecast Risk Matrix at T+${selectedLeadTime}m Horizon`}
          badge={`${villages.length} VILLAGES`}
        />
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-body-sm">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant text-label-caps text-on-surface-variant">
                <th className="p-2.5">Village / Sector</th>
                <th className="p-2.5">Block</th>
                <th className="p-2.5">Projected Flood Risk</th>
                <th className="p-2.5">Projected Slope Risk</th>
                <th className="p-2.5">Lead Time to Peak</th>
                <th className="p-2.5">Exposed Population</th>
                <th className="p-2.5">Road Connectivity</th>
                <th className="p-2.5">Recommended Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant text-code-sm">
              {villages.map((v) => {
                const adjFlood = Math.min(1.0, +(v.floodProbability + (selectedLeadTime / 120) * 0.15).toFixed(2));
                const adjSlope = Math.min(1.0, +(v.slopeProbability + (selectedLeadTime / 120) * 0.1).toFixed(2));
                const isCritical = adjFlood > 0.75 || adjSlope > 0.7;

                return (
                  <tr key={v.id} className={`hover:bg-surface-container/50 ${isCritical ? 'bg-error-container/10' : ''}`}>
                    <td className="p-2.5 font-bold text-on-surface">{v.name}</td>
                    <td className="p-2.5 text-on-surface-variant">{v.block}</td>
                    <td className="p-2.5">
                      <div className="flex items-center gap-1.5">
                        <div className="w-16 h-2 bg-surface-container rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: `${adjFlood * 100}%` }} />
                        </div>
                        <span className="font-mono font-bold text-primary">{(adjFlood * 100).toFixed(0)}%</span>
                      </div>
                    </td>
                    <td className="p-2.5">
                      <div className="flex items-center gap-1.5">
                        <div className="w-16 h-2 bg-surface-container rounded-full overflow-hidden">
                          <div className="h-full bg-[#ea580c]" style={{ width: `${adjSlope * 100}%` }} />
                        </div>
                        <span className="font-mono font-bold text-[#ea580c]">{(adjSlope * 100).toFixed(0)}%</span>
                      </div>
                    </td>
                    <td className="p-2.5 font-bold text-error font-mono">{Math.max(10, v.leadTimeMinutes - selectedLeadTime)} min</td>
                    <td className="p-2.5 font-mono">{v.populationExposure.toLocaleString()}</td>
                    <td className="p-2.5">
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${v.roadAccessible ? 'bg-[#dcfce7] text-[#166534]' : 'bg-[#fee2e2] text-[#991b1b]'}`}>
                        {v.roadAccessible ? 'ACCESSIBLE' : 'CUT / BLOCKED'}
                      </span>
                    </td>
                    <td className="p-2.5 text-on-surface max-w-xs truncate" title={v.nearestShelter}>
                      {isCritical ? `Immediate evacuation to ${v.nearestShelter}` : `Monitor nallah gauge; pre-alert ward`}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
