import { useState } from 'react';
import { useAppStore } from '../hooks/useAppStore';
import NDRFDecisionEngine from '../components/ui/NDRFDecisionEngine';
import SectionHeader from '../components/ui/SectionHeader';
import { ShieldCheck, Truck, CheckCircle2, PhoneCall } from 'lucide-react';

export default function NDRFPage() {
  const { ndrfTeams } = useAppStore();
  const [dispatchedId, setDispatchedId] = useState<string | null>(null);

  const handleDispatch = (teamId: string) => {
    setDispatchedId(teamId);
    setTimeout(() => setDispatchedId(null), 3000);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 bg-surface-container-low p-3 rounded border border-outline-variant">
        <div>
          <h2 className="text-headline-sm uppercase tracking-tight text-primary font-bold flex items-center gap-2">
            <ShieldCheck size={20} />
            NDRF & SDRF Tactical Deployment Priority Engine
          </h2>
          <p className="text-code-sm text-on-surface-variant">
            Automated rescue force mobilization routing, travel ETA calculator factoring mountain road cuts, and statutory requisition authorization.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded bg-primary text-white text-code-sm font-bold shadow-sm">
            {ndrfTeams.length} UNITS STAGED IN THEATER
          </span>
        </div>
      </div>

      {dispatchedId && (
        <div className="p-3 bg-[#dcfce7] border border-[#86efac] text-[#166534] rounded text-body-sm font-semibold flex items-center gap-2">
          <CheckCircle2 size={18} />
          Official Requisition Order broadcast to {ndrfTeams.find(t => t.id === dispatchedId)?.name}! Unit status updated to EN ROUTE.
        </div>
      )}

      {/* Main Grid: Decision Engine (5 cols) + Unit Staging Matrix (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        <div className="lg:col-span-5 flex flex-col gap-4">
          <NDRFDecisionEngine />
        </div>

        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* Active Unit Staging Roster */}
          <div className="bg-surface-container-lowest rounded border border-outline-variant shadow-sm flex flex-col">
            <SectionHeader
              icon={<Truck size={18} />}
              title="Assigned Response Battalions & Equipment Rosters"
              badge="STAGING ROSTER"
            />

            <div className="p-3 flex flex-col gap-3">
              {ndrfTeams.map(team => (
                <div 
                  key={team.id}
                  className="p-3.5 rounded border border-outline-variant bg-surface-container-low flex flex-col gap-2 shadow-sm"
                >
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-headline-sm text-on-surface">{team.name}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-surface-container border border-outline font-mono">
                        {team.type}
                      </span>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-code-sm font-bold ${
                      team.status === 'DEPLOYED' ? 'bg-primary text-white' : team.status === 'EN_ROUTE' ? 'bg-[#ea580c] text-white' : 'bg-[#e2e8f0] text-on-surface'
                    }`}>
                      {team.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-code-sm bg-surface-container p-2 rounded">
                    <div>Strength: <strong className="text-on-surface">{team.personnel} Personnel</strong></div>
                    <div>Base: <strong className="text-on-surface">{team.baseLocation}</strong></div>
                    <div>Location: <strong className="text-on-surface">{team.currentLocation}</strong></div>
                    <div>ETA to Sector: <strong className="text-error font-bold">{team.estimatedTravelMinutes} min</strong></div>
                  </div>

                  <div className="flex flex-col gap-1 text-code-sm">
                    <span className="text-on-surface-variant font-semibold">Specialized Search & Rescue Equipment:</span>
                    <div className="flex flex-wrap gap-1">
                      {team.equipment.map((eq, i) => (
                        <span key={i} className="px-1.5 py-0.5 rounded bg-surface-container-lowest border border-outline-variant text-[11px]">
                          {eq}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-outline-variant text-code-sm">
                    <span className="text-on-surface-variant flex items-center gap-1">
                      <PhoneCall size={13} className="text-primary" /> Contact: <strong>{team.contactOfficer}</strong>
                    </span>
                    <button
                      onClick={() => handleDispatch(team.id)}
                      className="h-7 px-3 bg-primary hover:bg-blue-900 text-white rounded text-[12px] font-semibold transition-colors flex items-center gap-1"
                    >
                      <CheckCircle2 size={13} /> Issue Operational Order
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
