import { useState } from 'react';
import { useAppStore } from '../hooks/useAppStore';
import SectorRiskAnalysis from '../components/ui/SectorRiskAnalysis';
import SectionHeader from '../components/ui/SectionHeader';
import { Activity, ShieldAlert, Search } from 'lucide-react';
import { RISK_COLORS } from '../data/constants';

export default function RiskAssessmentPage() {
  const { villages } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTier, setSelectedTier] = useState<string>('ALL');

  const filteredVillages = villages.filter(v => {
    const matchesSearch = v.name.toLowerCase().includes(searchQuery.toLowerCase()) || v.block.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTier = selectedTier === 'ALL' || v.riskLevel === selectedTier;
    return matchesSearch && matchesTier;
  });

  return (
    <div className="flex flex-col gap-4">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 bg-surface-container-low p-3 rounded border border-outline-variant">
        <div>
          <h2 className="text-headline-sm uppercase tracking-tight text-primary font-bold flex items-center gap-2">
            <Activity size={20} />
            Hyper-Local Village & Ward Risk Assessment
          </h2>
          <p className="text-code-sm text-on-surface-variant">
            Explainable AI risk calculation combining rainfall intensity, DEM slope gradient, Topographic Wetness Index (TWI), and stream proximity.
          </p>
        </div>
        <div className="flex items-center gap-2 font-mono text-code-sm">
          <span className="px-2 py-0.5 rounded bg-error text-white font-bold">
            {villages.filter(v => v.riskLevel === 'VERY_HIGH').length} VERY HIGH
          </span>
          <span className="px-2 py-0.5 rounded bg-[#ea580c] text-white font-bold">
            {villages.filter(v => v.riskLevel === 'HIGH').length} HIGH
          </span>
        </div>
      </div>

      {/* Primary 2-column workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left: Sector Risk Breakdown (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <SectorRiskAnalysis />
          
          <div className="bg-surface-container-lowest rounded border border-outline-variant p-3.5 shadow-sm flex flex-col gap-2">
            <span className="text-label-caps text-on-surface-variant font-bold">Explainable AI Risk Model Weights</span>
            <div className="space-y-2 text-code-sm">
              <div>
                <div className="flex justify-between mb-0.5">
                  <span>Rainfall Runoff Accumulation (IMD AWS)</span>
                  <span className="font-bold text-primary">35% Weight</span>
                </div>
                <div className="h-1.5 bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: '35%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-0.5">
                  <span>Terrain Slope Gradient (SRTM DEM)</span>
                  <span className="font-bold text-[#ea580c]">25% Weight</span>
                </div>
                <div className="h-1.5 bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-[#ea580c]" style={{ width: '25%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-0.5">
                  <span>Soil Moisture Saturation Index</span>
                  <span className="font-bold text-[#b45309]">20% Weight</span>
                </div>
                <div className="h-1.5 bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-[#b45309]" style={{ width: '20%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-0.5">
                  <span>Drainage Capacity & Stream Proximity</span>
                  <span className="font-bold text-secondary">20% Weight</span>
                </div>
                <div className="h-1.5 bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-secondary" style={{ width: '20%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Village Risk Assessment Directory (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="bg-surface-container-lowest rounded border border-outline-variant shadow-sm flex flex-col">
            <SectionHeader
              icon={<ShieldAlert size={18} />}
              title="Village Risk Registry & Geomorphic Attributes"
              badge={`${filteredVillages.length} MATCHING`}
            >
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search size={14} className="absolute left-2.5 top-2 text-on-surface-variant" />
                  <input
                    type="text"
                    placeholder="Search village or block..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-7 pl-7 pr-2 bg-surface-container-lowest border border-outline-variant rounded text-code-sm focus:outline-none focus:border-primary w-40"
                  />
                </div>
                <select
                  value={selectedTier}
                  onChange={(e) => setSelectedTier(e.target.value)}
                  className="h-7 px-2 bg-surface-container-lowest border border-outline-variant rounded text-code-sm focus:outline-none focus:border-primary"
                >
                  <option value="ALL">All Tiers</option>
                  <option value="VERY_HIGH">Very High</option>
                  <option value="HIGH">High</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="LOW">Low</option>
                </select>
              </div>
            </SectionHeader>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-body-sm">
                <thead>
                  <tr className="bg-surface-container-low border-b border-outline-variant text-label-caps text-on-surface-variant">
                    <th className="p-2.5">Village</th>
                    <th className="p-2.5">Block</th>
                    <th className="p-2.5">Risk Tier</th>
                    <th className="p-2.5">Lead Time</th>
                    <th className="p-2.5">Exposed Pop</th>
                    <th className="p-2.5">Slope / Stream</th>
                    <th className="p-2.5">Road Access</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant text-code-sm">
                  {filteredVillages.map((v) => (
                    <tr key={v.id} className="hover:bg-surface-container/50">
                      <td className="p-2.5 font-bold text-on-surface">
                        <div>{v.name}</div>
                        <div className="text-[10px] text-on-surface-variant font-normal">{v.nearestShelter}</div>
                      </td>
                      <td className="p-2.5 text-on-surface-variant">{v.block}</td>
                      <td className="p-2.5">
                        <span 
                          className="px-2 py-0.5 rounded text-[10px] font-bold text-white shadow-sm"
                          style={{ backgroundColor: RISK_COLORS[v.riskLevel] }}
                        >
                          {v.riskLevel}
                        </span>
                      </td>
                      <td className="p-2.5 font-bold font-mono text-error">{v.leadTimeMinutes} min</td>
                      <td className="p-2.5 font-mono">{v.populationExposure.toLocaleString()}</td>
                      <td className="p-2.5 font-mono text-on-surface-variant">
                        {v.slope}° / {v.streamProximityM}m
                      </td>
                      <td className="p-2.5">
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                          v.roadAccessible ? 'bg-[#dcfce7] text-[#166534]' : 'bg-[#fee2e2] text-[#991b1b]'
                        }`}>
                          {v.roadAccessible ? 'OPEN' : 'CUT / BLOCKED'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
