import { useState } from 'react';
import { useAppStore } from '../hooks/useAppStore';
import SectionHeader from '../components/ui/SectionHeader';
import { Radio, RefreshCw, CheckCircle2, Wifi, Activity } from 'lucide-react';
import { formatTime } from '../utils/formatting';

export default function SystemHealthPage() {
  const { sensors, apiEndpoints, forceSyncEndpoint, toggleEndpointStatus, isOnline, lastSync } = useAppStore();
  const [filterType, setFilterType] = useState<'ALL' | 'rainfall' | 'river' | 'soil'>('ALL');
  const [isSyncingAll, setIsSyncingAll] = useState(false);

  const filteredSensors = sensors.filter(s => filterType === 'ALL' || s.type === filterType);
  const onlineSensors = sensors.filter(s => s.status !== 'offline');

  const handleSyncAll = () => {
    setIsSyncingAll(true);
    setTimeout(() => {
      setIsSyncingAll(false);
    }, 1200);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 bg-surface-container-low p-3 rounded border border-outline-variant">
        <div>
          <h2 className="text-headline-sm uppercase tracking-tight text-primary font-bold flex items-center gap-2">
            <Radio size={20} />
            System Feeds, Telemetry Network & Sensor Health
          </h2>
          <p className="text-code-sm text-on-surface-variant">
            Multi-source telemetry ingestion status: IMD Doppler Weather Radar, CWC Hydrological Stations, IoT In-situ River Gauges, and PWD road feeds.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={handleSyncAll}
            disabled={isSyncingAll}
            className="h-8 px-3 rounded bg-primary text-white text-code-sm font-semibold hover:bg-blue-900 transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <RefreshCw size={14} className={isSyncingAll ? 'animate-spin' : ''} />
            {isSyncingAll ? 'Polling Telemetry...' : 'Force Sync All Feeds'}
          </button>
        </div>
      </div>

      {/* Network & Health Overview KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-surface-container-lowest p-3 rounded border border-outline-variant shadow-sm flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-label-caps text-on-surface-variant">Local Gateway Status</span>
            <span className={`text-headline-sm font-bold ${isOnline ? 'text-secondary' : 'text-error'}`}>
              {isOnline ? 'ONLINE & SYNCED' : 'OFFLINE (LOCAL BUFFER)'}
            </span>
            <span className="text-code-sm text-on-surface-variant">Cycle: {formatTime(lastSync)} IST</span>
          </div>
          <Wifi size={28} className={isOnline ? 'text-secondary' : 'text-error'} />
        </div>

        <div className="bg-surface-container-lowest p-3 rounded border border-outline-variant shadow-sm flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-label-caps text-on-surface-variant">Connected Telemetry Nodes</span>
            <span className="text-headline-sm font-bold text-primary">
              {onlineSensors.length} / {sensors.length} Active
            </span>
            <span className="text-code-sm text-secondary font-semibold">94.2% Availability</span>
          </div>
          <Activity size={28} className="text-primary" />
        </div>

        <div className="bg-surface-container-lowest p-3 rounded border border-outline-variant shadow-sm flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-label-caps text-on-surface-variant">Upstream API Feeds</span>
            <span className="text-headline-sm font-bold text-on-surface">
              {apiEndpoints.filter(e => e.status === 'CONNECTED').length} / {apiEndpoints.length} Linked
            </span>
            <span className="text-code-sm text-on-surface-variant">IMD, CWC, PWD, NDRF</span>
          </div>
          <CheckCircle2 size={28} className="text-secondary" />
        </div>

        <div className="bg-surface-container-lowest p-3 rounded border border-outline-variant shadow-sm flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-label-caps text-on-surface-variant">Telemetry Ingestion Latency</span>
            <span className="text-headline-sm font-bold text-secondary">
              240 ms
            </span>
            <span className="text-code-sm text-on-surface-variant">Sub-second stream</span>
          </div>
          <Radio size={28} className="text-tertiary" />
        </div>
      </div>

      {/* Upstream APIs Integration Table */}
      <div className="bg-surface-container-lowest rounded border border-outline-variant shadow-sm flex flex-col">
        <SectionHeader
          icon={<Radio size={18} />}
          title="National & State External API Ingestion Feeds"
          badge="DATA INTEGRATION"
        />
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-body-sm">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant text-label-caps text-on-surface-variant">
                <th className="p-2.5">Feed Source / Pipeline</th>
                <th className="p-2.5">API Endpoint URL</th>
                <th className="p-2.5">Status</th>
                <th className="p-2.5">Last Ingested Sync</th>
                <th className="p-2.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant text-code-sm">
              {apiEndpoints.map(ep => (
                <tr key={ep.id} className="hover:bg-surface-container/50">
                  <td className="p-2.5 font-bold text-on-surface">{ep.name}</td>
                  <td className="p-2.5 font-mono text-on-surface-variant text-[11px] truncate max-w-xs">{ep.url}</td>
                  <td className="p-2.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      ep.status === 'CONNECTED' ? 'bg-[#dcfce7] text-[#166534]' : 'bg-[#fee2e2] text-[#991b1b]'
                    }`}>
                      {ep.status}
                    </span>
                  </td>
                  <td className="p-2.5 text-on-surface-variant">{ep.lastSync}</td>
                  <td className="p-2.5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => forceSyncEndpoint(ep.id)}
                        className="h-6 px-2 bg-surface-container hover:bg-surface-container-high rounded text-[11px] font-semibold text-on-surface transition-colors"
                      >
                        Ping Now
                      </button>
                      <button
                        onClick={() => toggleEndpointStatus(ep.id)}
                        className="h-6 px-2 bg-surface-container-lowest border border-outline-variant hover:bg-surface-container rounded text-[11px] font-semibold text-on-surface-variant transition-colors"
                      >
                        {ep.status === 'CONNECTED' ? 'Disable' : 'Enable'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Field IoT Sensor Telemetry Table */}
      <div className="bg-surface-container-lowest rounded border border-outline-variant shadow-sm flex flex-col">
        <SectionHeader
          icon={<Activity size={18} />}
          title="Field IoT Hydrological Gauges & Automated Weather Stations (AWS)"
          badge={`${sensors.length} SENSORS`}
        >
          <div className="flex items-center gap-1.5 text-code-sm">
            {(['ALL', 'rainfall', 'river', 'soil'] as const).map(type => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold capitalize border ${
                  filterType === type 
                    ? 'bg-primary text-white border-primary shadow' 
                    : 'bg-surface-container-lowest border-outline-variant text-on-surface-variant hover:bg-surface-container'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </SectionHeader>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-body-sm">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant text-label-caps text-on-surface-variant">
                <th className="p-2.5">Sensor ID / Gauge</th>
                <th className="p-2.5">Category</th>
                <th className="p-2.5">Location / Catchment</th>
                <th className="p-2.5">Coordinates</th>
                <th className="p-2.5">Current Value</th>
                <th className="p-2.5">Danger Threshold</th>
                <th className="p-2.5">Operational Status</th>
                <th className="p-2.5">Last Ingested</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant text-code-sm">
              {filteredSensors.map(s => {
                const isCritical = s.value >= s.threshold;
                const isWarning = s.status === 'warning';

                return (
                  <tr key={s.id} className={`hover:bg-surface-container/50 ${isCritical ? 'bg-error-container/10' : ''}`}>
                    <td className="p-2.5 font-bold text-on-surface">{s.name}</td>
                    <td className="p-2.5 uppercase font-mono text-[11px] text-on-surface-variant">{s.type}</td>
                    <td className="p-2.5 text-on-surface-variant">{s.location} ({s.block})</td>
                    <td className="p-2.5 font-mono text-[11px] text-on-surface-variant">{s.latitude.toFixed(4)}°N, {s.longitude.toFixed(4)}°E</td>
                    <td className="p-2.5 font-mono font-bold">
                      <span className={isCritical ? 'text-error' : isWarning ? 'text-[#b45309]' : 'text-primary'}>
                        {s.value} {s.unit}
                      </span>
                    </td>
                    <td className="p-2.5 font-mono text-on-surface-variant">{s.threshold} {s.unit}</td>
                    <td className="p-2.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        s.status === 'warning' ? 'bg-[#fef3c7] text-[#92400e]' : s.status === 'offline' ? 'bg-[#f1f5f9] text-[#64748b]' : 'bg-[#dcfce7] text-[#166534]'
                      }`}>
                        {s.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="p-2.5 text-on-surface-variant">{formatTime(s.updatedAt)} IST</td>
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
