import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../hooks/useAppStore';
import { ShieldCheck, CheckCircle2, Navigation, AlertCircle } from 'lucide-react';
import SectionHeader from './SectionHeader';

export default function NDRFDecisionEngine() {
  const navigate = useNavigate();
  const { deploymentRecommendations, ndrfTeams, deployNDRFTeam, dispatchNDRFTeam, currentUser } = useAppStore();
  const [assignedTeamId, setAssignedTeamId] = useState<string | null>(null);
  const [routeNote, setRouteNote] = useState<string | null>(null);

  const priority1 = deploymentRecommendations[0];
  const priority2 = deploymentRecommendations[1];

  const handleAssignTeam = (teamName: string, village?: string) => {
    deployNDRFTeam(teamName, `En Route to ${village || 'Mawsynram Cluster'}`);
    const team = ndrfTeams.find((t) => teamName.includes(t.name) || t.name.includes(teamName));
    if (team) {
      dispatchNDRFTeam(team.id, village || priority1?.village || 'Mawsynram Cluster');
    }
    setAssignedTeamId(teamName);
    setTimeout(() => setAssignedTeamId(null), 5000);
  };

  return (
    <div className="bg-surface-container-lowest rounded border border-outline-variant shadow-sm flex flex-col">
      <SectionHeader
        icon={<ShieldCheck size={18} />}
        title="NDRF Deployment Decision Engine"
        badge="ACT-2"
      />
      <div className="px-3 pb-2 pt-1 bg-surface-container-low border-b border-outline-variant">
         <p className="font-mono text-[10px] text-on-surface-variant leading-tight">
          AI-assisted recommendation. Designed for NDRF workflow. Final deployment decision remains strictly with authorized statutory officials.
        </p>
      </div>
      
      <div className="p-3 flex flex-col gap-3">
        {assignedTeamId && (
          <div className="p-2.5 bg-[#dcfce7] border border-[#86efac] text-[#166534] rounded text-body-sm font-semibold flex items-center gap-2">
            <CheckCircle2 size={16} />
            <span>Unit Mobilized: Alpha Team dispatched by {currentUser?.name.split(',')[0] || 'DEO'}. Requisition #DDMA-2026-NDRF01 broadcast!</span>
          </div>
        )}

        {/* Card 1 */}
        {priority1 && (
          <div className="rounded border-2 border-error bg-error-container/10 p-3 flex flex-col gap-2 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-1.5 py-0.5 rounded bg-error text-on-error font-mono text-[10px] font-bold">PRIORITY {priority1.priority}</span>
                <span className="text-[14px] font-bold text-on-surface">{priority1.village} Cluster</span>
              </div>
              <span className="font-mono text-code-sm font-bold text-error">{priority1.leadTimeMinutes} MIN REMAINING</span>
            </div>
            
            <div className="grid grid-cols-2 gap-1 text-[11px] font-mono text-on-surface-variant">
              <div>Exposed Pop: <strong className="text-on-surface">{priority1.population.toLocaleString()}</strong></div>
              <div className="truncate">Roads: <strong className="text-secondary font-bold truncate">{priority1.roadStatus}</strong></div>
              <div className="truncate">Nearest: <strong className="text-on-surface truncate">{priority1.nearestTeam}</strong></div>
              <div>Transit ETA: <strong className="text-error font-bold">{priority1.estimatedTravelMinutes} min</strong></div>
            </div>
            
            <div className="p-2 bg-surface-container-lowest rounded border border-outline-variant text-[11px] text-on-surface">
              <strong className="text-primary">Recommended Action:</strong> {priority1.recommendedAction}
            </div>
            
            <div className="flex items-center gap-2 pt-1">
              <button 
                className="flex-1 h-7 bg-primary hover:bg-[#1e40af] text-white rounded text-[12px] font-semibold transition-colors flex items-center justify-center gap-1 active:scale-95 shadow-sm" 
                onClick={() => handleAssignTeam(priority1.nearestTeam, priority1.village)}
              >
                <CheckCircle2 size={14} /> Assign Team
              </button>
              <button 
                onClick={() => {
                  setRouteNote(`Demo route selected: ${priority1.nearestTeam} → ${priority1.village} (Navigating road detours)`);
                  navigate('/roads');
                }}
                className="h-7 px-3 bg-surface-container-lowest border border-outline hover:bg-surface-container rounded text-[11px] text-on-surface font-semibold flex items-center gap-1 active:scale-95"
              >
                <Navigation size={12} /> Nav Route
              </button>
            </div>
          </div>
        )}

        {/* Card 2 */}
        {priority2 && (
          <div className="rounded border border-outline-variant bg-surface-container-low p-3 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-1.5 py-0.5 rounded bg-[#d97706] text-white font-mono text-[10px] font-bold">PRIORITY {priority2.priority}</span>
                <span className="text-[14px] font-bold text-on-surface">{priority2.village}</span>
              </div>
              <span className="font-mono text-code-sm font-semibold text-[#b45309]">{priority2.leadTimeMinutes} MIN LEAD TIME</span>
            </div>
            
            <div className="grid grid-cols-2 gap-1 text-[11px] font-mono text-on-surface-variant">
              <div>Exposed Pop: <strong className="text-on-surface">{priority2.population.toLocaleString()}</strong></div>
              <div>Transit ETA: <strong className="text-on-surface">{priority2.estimatedTravelMinutes} min</strong></div>
            </div>
            
            <div className="p-2 bg-surface-container-lowest rounded border border-outline-variant text-[11px] text-on-surface">
              <strong className="text-on-surface">Recommended Action:</strong> {priority2.recommendedAction}
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button 
                className="flex-1 h-7 bg-surface-container-low border border-outline-variant hover:bg-surface-container text-on-surface rounded text-[12px] font-semibold transition-colors flex items-center justify-center gap-1"
                onClick={() => handleAssignTeam(priority2.nearestTeam)}
              >
                <AlertCircle size={13} className="text-[#b45309]" /> Stage Unit on Standby
              </button>
            </div>
          </div>
        )}
      </div>
      {routeNote && <div className="px-3 pb-3"><div className="p-2 bg-surface-container-low border border-outline-variant rounded text-[10px] font-semibold text-on-surface-variant">{routeNote}</div></div>}
    </div>
  );
}
