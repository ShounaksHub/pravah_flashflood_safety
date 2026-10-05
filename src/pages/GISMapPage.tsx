import { useState } from 'react';
import { useAppStore } from '../hooks/useAppStore';
import GISMap from '../components/map/GISMap';
import SectionHeader from '../components/ui/SectionHeader';
import { Layers, RefreshCw, Filter, Eye, AlertTriangle } from 'lucide-react';
import { RISK_COLORS } from '../data/constants';

export default function GISMapPage() {
  const { villages, sensors, isSimulating, advanceSimulation } = useAppStore();
  const [selectedBlock, setSelectedBlock] = useState('ALL');
  const [selectedVillageId, setSelectedVillageId] = useState<string | null>(null);

  const [layers, setLayers] = useState({
    flood: true,
    slope: true,
    radar: true,
    sensors: true,
    roads: true,
  });

  const filteredVillages = villages.filter(v => 
    selectedBlock === 'ALL' || v.block.toLowerCase().includes(selectedBlock.toLowerCase())
  );

  const selectedVillage = villages.find(v => v.id === selectedVillageId) || villages[0];

  return (
    <div className="flex flex-col gap-4">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 bg-surface-container-low p-3 rounded border border-outline-variant">
        <div>
          <h2 className="text-headline-sm uppercase tracking-tight text-primary font-bold flex items-center gap-2">
            <Layers size={20} />
            Tactical GIS Spatial Command & Risk Heatmap
          </h2>
          <p className="text-code-sm text-on-surface-variant">
            Live multi-layer geospatial view combining IMD radar reflectivity, CWC river gauge buffers, terrain slope failure zones, and road cuts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={advanceSimulation}
            className="h-8 px-3 rounded bg-surface-container border border-outline-variant text-code-sm font-semibold hover:bg-surface-container-high transition-colors flex items-center gap-1.5"
          >
            <RefreshCw size={14} className={isSimulating ? 'animate-spin' : ''} />
            Simulate Weather Tick
          </button>
        </div>
      </div>

      {/* Main Grid: GIS Map (8 cols) + Village Risk Matrix (4 cols) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-start">
        <div className="xl:col-span-8 flex flex-col gap-3">
          <div className="bg-surface-container-lowest rounded border border-outline-variant shadow-sm overflow-hidden flex flex-col">
            <SectionHeader
              icon={<Eye size={18} />}
              title="Geographical Information System | East Khasi Hills EOC"
              badge="LIVE GIS"
            >
              <div className="flex items-center gap-2">
                <Filter size={14} className="text-on-surface-variant" />
                <select 
                  value={selectedBlock}
                  onChange={(e) => setSelectedBlock(e.target.value)}
                  className="h-7 px-2 bg-surface-container-lowest border border-outline-variant rounded text-code-sm focus:outline-none focus:border-primary"
                >
                  <option value="ALL">All Blocks (All Sectors)</option>
                  <option value="Mawsynram">Mawsynram C&RD Block</option>
                  <option value="Sohra">Sohra (Cherrapunji) Block</option>
                  <option value="Pynursla">Pynursla Block</option>
                  <option value="Shella">Shella Bholaganj Block</option>
                </select>
              </div>
            </SectionHeader>

            {/* Active GIS Layer Controls */}
            <div className="px-3 py-2 bg-surface-container border-b border-outline-variant flex items-center gap-4 overflow-x-auto text-[12px]">
              <span className="text-label-caps font-bold whitespace-nowrap text-on-surface-variant">Active Layers:</span>
              {Object.entries(layers).map(([key, value]) => (
                <label key={key} className="flex items-center gap-1.5 cursor-pointer whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={() => setLayers(prev => ({ ...prev, [key]: !prev[key as keyof typeof layers] }))}
                    className="rounded border-outline text-primary focus:ring-0 w-3.5 h-3.5"
                  />
                  <span className={value ? 'font-semibold text-primary capitalize' : 'text-on-surface capitalize'}>
                    {key === 'flood' ? 'Flood Risk Zones' : key === 'slope' ? 'Slope Failure Buffers' : key === 'radar' ? 'Radar Reflectivity' : key === 'sensors' ? 'IoT Sensors' : 'Road Access Corridors'}
                  </span>
                </label>
              ))}
            </div>

            {/* The GIS Map */}
            <div className="w-full h-[540px]">
              <GISMap layers={layers} />
            </div>

            {/* Map Legend */}
            <div className="p-2.5 bg-surface-container-low border-t border-outline-variant flex items-center justify-between text-code-sm flex-wrap gap-2">
              <div className="flex items-center gap-4">
                <span className="font-semibold text-on-surface">Legend:</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-[#ba1a1a]" /> Very High Risk (Lead &lt;45m)</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-[#ea580c]" /> High Risk (Lead &lt;90m)</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-[#ca8a04]" /> Medium Risk</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-[#16a34a]" /> Low Risk / Normal</span>
              </div>
              <div className="text-on-surface-variant text-[11px]">
                Showing {filteredVillages.length} Villages | {sensors.length} Connected Telemetry Points
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Village Geospatial Profile */}
        <div className="xl:col-span-4 flex flex-col gap-4">
          {/* Selected Village Card */}
          {selectedVillage && (
            <div className="bg-surface-container-lowest rounded border border-outline-variant p-4 shadow-sm flex flex-col gap-3">
              <div className="flex items-center justify-between border-b border-outline-variant pb-2">
                <div>
                  <span className="text-label-caps text-on-surface-variant">Selected Sector Dossier</span>
                  <h3 className="text-headline-md font-bold text-on-surface">{selectedVillage.name}</h3>
                  <span className="text-code-sm text-on-surface-variant">{selectedVillage.block}</span>
                </div>
                <span 
                  className="px-2.5 py-1 rounded text-code-sm font-bold text-white shadow-sm"
                  style={{ backgroundColor: RISK_COLORS[selectedVillage.riskLevel] }}
                >
                  {selectedVillage.riskLevel} RISK
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-code-sm">
                <div className="p-2 bg-surface-container-low rounded border border-outline-variant">
                  <span className="text-on-surface-variant text-[10px] block">ESTIMATED LEAD TIME</span>
                  <span className="text-headline-sm font-bold text-error">{selectedVillage.leadTimeMinutes} min</span>
                </div>
                <div className="p-2 bg-surface-container-low rounded border border-outline-variant">
                  <span className="text-on-surface-variant text-[10px] block">POPULATION EXPOSED</span>
                  <span className="text-headline-sm font-bold text-on-surface">{selectedVillage.populationExposure.toLocaleString()}</span>
                </div>
                <div className="p-2 bg-surface-container-low rounded border border-outline-variant">
                  <span className="text-on-surface-variant text-[10px] block">FLOOD PROBABILITY</span>
                  <span className="text-body-sm font-bold text-primary">{(selectedVillage.floodProbability * 100).toFixed(0)}%</span>
                </div>
                <div className="p-2 bg-surface-container-low rounded border border-outline-variant">
                  <span className="text-on-surface-variant text-[10px] block">SLOPE FAILURE RISK</span>
                  <span className="text-body-sm font-bold text-[#b45309]">{(selectedVillage.slopeProbability * 100).toFixed(0)}%</span>
                </div>
              </div>

              <div className="text-body-sm flex flex-col gap-1">
                <span className="text-label-caps text-on-surface-variant font-bold">Terrain & Hydrology Attributes:</span>
                <div className="grid grid-cols-2 gap-1 text-code-sm bg-surface-container p-2 rounded">
                  <span>Elevation: <strong>{selectedVillage.elevation} m</strong></span>
                  <span>Slope: <strong>{selectedVillage.slope}°</strong></span>
                  <span>Stream Proximity: <strong>{selectedVillage.streamProximityM} m</strong></span>
                  <span>Road Access: <strong className={selectedVillage.roadAccessible ? 'text-[#16a34a]' : 'text-error'}>{selectedVillage.roadAccessible ? 'Accessible' : 'CUT / BLOCKED'}</strong></span>
                </div>
              </div>

              <div className="text-body-sm flex flex-col gap-1">
                <span className="text-label-caps text-on-surface-variant font-bold">Primary Risk Factors:</span>
                <div className="flex flex-col gap-1">
                  {selectedVillage.riskReasons.map((reason, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-code-sm text-on-surface">
                      <AlertTriangle size={13} className="text-error mt-0.5 flex-shrink-0" />
                      <span>{reason}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-outline-variant flex items-center justify-between text-code-sm">
                <span className="text-on-surface-variant">Designated Shelter:</span>
                <span className="font-semibold text-primary">{selectedVillage.nearestShelter} ({selectedVillage.shelterDistanceKm} km)</span>
              </div>
            </div>
          )}

          {/* Quick Village Sector Selector List */}
          <div className="bg-surface-container-lowest rounded border border-outline-variant shadow-sm flex flex-col max-h-[300px] overflow-hidden">
            <div className="p-2.5 bg-surface-container-low border-b border-outline-variant flex items-center justify-between">
              <span className="text-label-caps text-on-surface-variant font-bold">Village Risk Directory</span>
              <span className="text-code-sm text-on-surface-variant">{filteredVillages.length} Sectors</span>
            </div>
            <div className="divide-y divide-outline-variant overflow-y-auto">
              {filteredVillages.map(v => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVillageId(v.id)}
                  className={`w-full text-left p-2.5 flex items-center justify-between hover:bg-surface-container transition-colors ${
                    selectedVillage?.id === v.id ? 'bg-surface-container-high border-l-4 border-primary' : ''
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="text-body-sm font-semibold text-on-surface">{v.name}</span>
                    <span className="text-code-sm text-on-surface-variant">{v.block}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-code-sm font-bold text-error">{v.leadTimeMinutes}m</span>
                    <span 
                      className="px-1.5 py-0.5 rounded text-[10px] font-bold text-white"
                      style={{ backgroundColor: RISK_COLORS[v.riskLevel] }}
                    >
                      {v.riskLevel}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
