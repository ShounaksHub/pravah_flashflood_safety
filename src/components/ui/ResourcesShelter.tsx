import { useNavigate } from 'react-router-dom';
import { Warehouse } from 'lucide-react';
import SectionHeader from './SectionHeader';
import { mockShelters } from '../../data/mock/ndrfTeams';

export default function ResourcesShelter() {
  const navigate = useNavigate();
  return (
    <div className="bg-surface-container-lowest rounded border border-outline-variant shadow-sm flex flex-col overflow-hidden h-full">
      <SectionHeader
        icon={<Warehouse size={18} />}
        title="Resources & Shelter Fleet"
      >
        <span className="font-mono text-[10px] text-on-surface-variant">DDMA INVENTORY</span>
      </SectionHeader>

      <div className="flex-1 overflow-y-auto p-2 flex flex-col gap-2">
        {mockShelters.map(shelter => {
          const occupancyRate = (shelter.currentOccupancy / shelter.capacity) * 100;
          return (
            <div key={shelter.id} className="p-2 bg-surface-container-low rounded border border-outline-variant flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-bold text-on-surface">{shelter.name}</span>
                <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase
                  ${shelter.status === 'OPEN' ? 'bg-[#dcfce7] text-[#166534]' : 'bg-[#f1f5f9] text-[#475569]'}`}>
                  {shelter.status}
                </span>
              </div>
              
              <div className="flex items-center justify-between font-mono text-[10px] text-on-surface-variant">
                <span>Cap: {shelter.currentOccupancy} / {shelter.capacity}</span>
                <span className={occupancyRate > 90 ? 'text-error font-bold' : occupancyRate > 50 ? 'text-[#b45309]' : ''}>
                  {occupancyRate.toFixed(0)}% FULL
                </span>
              </div>
              
              <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                <div 
                  className={`h-full ${occupancyRate > 90 ? 'bg-error' : occupancyRate > 50 ? 'bg-[#d97706]' : 'bg-[#22c55e]'}`}
                  style={{ width: `${Math.min(100, occupancyRate)}%` }}
                />
              </div>

              <div className="text-[9px] font-mono text-on-surface-variant flex flex-wrap gap-1 mt-0.5">
                {shelter.facilities.map((fac: string) => (
                  <span key={fac} className="px-1 bg-surface-container-lowest border border-outline-variant rounded">{fac}</span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <div className="p-2 bg-surface-container-low border-t border-outline-variant flex items-center justify-between text-[11px]">
        <span className="text-on-surface-variant font-mono">Total Relief Cap: 1,800 Beds</span>
        <button 
          onClick={() => navigate('/resources')} 
          className="text-primary hover:underline font-semibold font-mono text-[11px]"
        >
          Manage Fleet →
        </button>
      </div>
    </div>
  );
}
