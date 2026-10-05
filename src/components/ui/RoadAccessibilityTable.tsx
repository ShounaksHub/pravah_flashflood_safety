import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../hooks/useAppStore';
import { TrafficCone } from 'lucide-react';
import SectionHeader from './SectionHeader';

export default function RoadAccessibilityTable() {
  const navigate = useNavigate();
  const { roads } = useAppStore();

  return (
    <div className="bg-surface-container-lowest rounded border border-outline-variant shadow-sm flex flex-col overflow-hidden">
      <SectionHeader
        icon={<TrafficCone size={18} />}
        title="Road Accessibility Corridors"
      >
        <span className="font-mono text-[10px] text-on-surface-variant">PWD & NHAI FEED</span>
      </SectionHeader>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container border-b-2 border-outline-variant text-on-surface-variant text-[10px] font-bold uppercase tracking-wider">
              <th className="py-2 px-3">Corridor / Artery</th>
              <th className="py-2 px-3">Status</th>
              <th className="py-2 px-3">Risk</th>
              <th className="py-2 px-3 text-right">Transit</th>
            </tr>
          </thead>
          <tbody className="font-mono text-[11px] divide-y divide-surface-container">
            {roads.map(road => (
              <tr key={road.id} className={`hover:bg-surface-container-low ${road.status === 'BLOCKED' ? 'bg-[#fef2f2] hover:bg-[#fee2e2]' : ''}`}>
                <td className="py-2 px-3">
                  <div className={`font-semibold ${road.status === 'BLOCKED' ? 'text-error' : 'text-on-surface'}`}>{road.name}</div>
                  {road.status !== 'OPEN' && (
                    <div className={`text-[9px] ${road.status === 'BLOCKED' ? 'text-error' : 'text-[#b45309]'}`}>{road.blockagePoint} - {road.reason}</div>
                  )}
                </td>
                <td className="py-2 px-3">
                  <span className={`px-1.5 py-0.5 rounded font-bold text-[10px] border
                    ${road.status === 'OPEN' ? 'bg-[#dcfce7] text-[#166534] border-[#86efac]' : 
                      road.status === 'BLOCKED' ? 'bg-error text-on-error border-error' : 
                      'bg-[#fef3c7] text-[#92400e] border-[#fde68a]'}`}>
                    {road.status.replace('_', ' ')}
                  </span>
                </td>
                <td className={`py-2 px-3 font-bold ${road.status === 'BLOCKED' ? 'text-error' : road.status === 'AT_RISK' ? 'text-[#b45309]' : 'text-on-surface-variant'}`}>
                  {road.status === 'BLOCKED' ? 'Critical' : road.status === 'AT_RISK' ? 'High' : 'Low'}
                </td>
                <td className={`py-2 px-3 text-right font-bold ${road.status === 'BLOCKED' ? 'text-error' : 'text-on-surface'}`}>
                  {road.status === 'BLOCKED' ? 'CUT OFF' : road.estimatedClearance || 'Open'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-2 bg-surface-container-low border-t border-outline-variant flex items-center justify-between text-[11px]">
        <span className="text-on-surface-variant font-mono">Detour: Via Mawphlang Bypass (Open)</span>
        <button 
          onClick={() => navigate('/roads')} 
          className="text-primary hover:underline font-semibold font-mono text-[11px]"
        >
          Detour Nav →
        </button>
      </div>
    </div>
  );
}
