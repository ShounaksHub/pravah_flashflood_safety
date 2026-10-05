import { useState } from 'react';
import ResourcesShelter from '../components/ui/ResourcesShelter';
import SectionHeader from '../components/ui/SectionHeader';
import { Package, Truck, Plane, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function ResourcesPage() {
  const [dispatchedItem, setDispatchedItem] = useState<string | null>(null);

  const handleDispatch = (item: string) => {
    setDispatchedItem(item);
    setTimeout(() => setDispatchedItem(null), 3000);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 bg-surface-container-low p-3 rounded border border-outline-variant">
        <div>
          <h2 className="text-headline-sm uppercase tracking-tight text-primary font-bold flex items-center gap-2">
            <Package size={20} />
            Relief Camp Resources & Humanitarian Logistics Allocation
          </h2>
          <p className="text-code-sm text-on-surface-variant">
            Designated disaster shelters, capacity occupancy tracking, buffer rations, potable water tankers, and air reconnaissance coordination.
          </p>
        </div>
        <div className="flex items-center gap-2 font-mono text-code-sm">
          <span className="px-2.5 py-1 rounded bg-[#dcfce7] text-[#166534] font-bold border border-[#bbf7d0]">
            7,160 VACANT BED CAPACITY
          </span>
        </div>
      </div>

      {dispatchedItem && (
        <div className="p-3 bg-[#dcfce7] border border-[#86efac] text-[#166534] rounded text-body-sm font-semibold flex items-center gap-2">
          <CheckCircle2 size={18} />
          {dispatchedItem} requisition recorded in the MVP logistics workflow. No external dispatch gateway is connected.
        </div>
      )}

      {/* Grid: Shelter Matrix (6 cols) + Emergency Supply Depot (6 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        <div className="lg:col-span-6 flex flex-col gap-4">
          <ResourcesShelter />
        </div>

        <div className="lg:col-span-6 flex flex-col gap-4">
          {/* Emergency Buffer Logistics Card */}
          <div className="bg-surface-container-lowest rounded border border-outline-variant shadow-sm flex flex-col">
            <SectionHeader
              icon={<Truck size={18} />}
              title="District Emergency Buffer Stores (Central EOC Warehouse)"
              badge="LOGISTICS DEPOT"
            />

            <div className="p-4 flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-2 text-code-sm">
                <div className="p-3 bg-surface-container-low rounded border border-outline-variant">
                  <span className="text-on-surface-variant text-[10px] block">DRY RATIONS (RICE/DAL/OIL)</span>
                  <span className="text-headline-sm font-bold text-on-surface">18,500 kg</span>
                  <span className="text-secondary text-[11px] block mt-0.5">Sufficient for 14 Days</span>
                </div>
                <div className="p-3 bg-surface-container-low rounded border border-outline-variant">
                  <span className="text-on-surface-variant text-[10px] block">POTABLE DRINKING WATER</span>
                  <span className="text-headline-sm font-bold text-primary">32,000 L</span>
                  <span className="text-on-surface-variant text-[11px] block mt-0.5">8 Tankers Staged</span>
                </div>
                <div className="p-3 bg-surface-container-low rounded border border-outline-variant">
                  <span className="text-on-surface-variant text-[10px] block">TARPAULIN / SHELTER ROLLS</span>
                  <span className="text-headline-sm font-bold text-on-surface">2,400 Units</span>
                  <span className="text-secondary text-[11px] block mt-0.5">Ready for Transit</span>
                </div>
                <div className="p-3 bg-surface-container-low rounded border border-outline-variant">
                  <span className="text-on-surface-variant text-[10px] block">PARAMEDICAL FIRST-AID KITS</span>
                  <span className="text-headline-sm font-bold text-error">450 Kits</span>
                  <span className="text-on-surface-variant text-[11px] block mt-0.5">With Antivenom & ORS</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-2 border-t border-outline-variant">
                <button
                  onClick={() => handleDispatch('Emergency Supply Convoy')}
                  className="flex-1 h-8 px-3 bg-primary hover:bg-blue-900 text-white rounded text-code-sm font-semibold transition-colors flex items-center justify-center gap-1.5"
                >
                  <Truck size={14} /> Dispatch Relief Convoy
                </button>
                <button
                  onClick={() => handleDispatch('Indian Air Force (IAF) Air Recon & Airdrop')}
                  className="h-8 px-3 bg-surface-container-lowest border border-outline hover:bg-surface-container rounded text-code-sm font-semibold text-primary transition-colors flex items-center gap-1.5"
                >
                  <Plane size={14} /> Request Air Recon (IAF)
                </button>
              </div>
            </div>
          </div>

          {/* Guidelines Banner */}
          <div className="bg-surface-container-low p-4 rounded border border-outline-variant flex flex-col gap-2">
            <span className="text-label-caps text-on-surface-variant font-bold flex items-center gap-1">
              <ShieldCheck size={14} className="text-secondary" />
              SDRF Sphere Standards Protocol
            </span>
            <p className="text-code-sm text-on-surface leading-relaxed">
              Minimum 3.5 m² per person covered area mandated. Water allocation must meet 15 litres/person/day. Immediate sanitation facilities isolated from flood drainage channels.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
