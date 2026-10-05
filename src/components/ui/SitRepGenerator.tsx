import { useState } from 'react';
import { useAppStore } from '../../hooks/useAppStore';
import { FileText, Download, Send } from 'lucide-react';
import SectionHeader from './SectionHeader';

export default function SitRepGenerator() {
  const { villages, alerts, roads, ndrfTeams, scenarioPhase, scenarioStatus } = useAppStore();
  const [isGenerating, setIsGenerating] = useState(false);
  const [sitRepText, setSitRepText] = useState<string | null>(null);
  const [dispatchRecorded, setDispatchRecorded] = useState(false);

  const veryHighRisk = villages.filter(v => v.riskLevel === 'VERY_HIGH');
  const criticalRoads = roads.filter(r => r.status === 'BLOCKED');
  const activeAlerts = alerts.filter(a => a.status === 'ACTIVE');
  const activeNDRF = ndrfTeams.filter(t => t.status === 'DEPLOYED' || t.status === 'EN_ROUTE');

  const generateReport = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const text = `AI-ASSISTED PROTOTYPE SITUATION REPORT (DEMO DRAFT)
Incident: Operational Flash Flood Scenario Simulation (Phase ${scenarioPhase} — ${scenarioStatus})
Generated: ${new Date().toLocaleString()} IST
Jurisdiction: East Khasi Hills District, Meghalaya (PROTOTYPE DEMONSTRATION)

==================================================
1. INCIDENT OVERVIEW & ALERT STATUS
==================================================
- Active Emergency Alerts: ${activeAlerts.length}
${activeAlerts.length > 0 
  ? activeAlerts.map(a => `  • [${a.severity}] ${a.title}\n    Location: ${a.location} | Lead Time: ${a.leadTimeMinutes} min\n    Directive: ${a.recommendedAction}`).join('\n') 
  : '  • Normal monitoring baseline; no critical alerts active.'}

==================================================
2. SECTOR TRIAGE (VERY HIGH RISK VILLAGES)
==================================================
- Total Very High Risk Sectors: ${veryHighRisk.length}
${veryHighRisk.length > 0 
  ? veryHighRisk.map(v => `  • ${v.name} (${v.block}): Pop ${v.populationExposure.toLocaleString()} | Inundation Lead Time: ${v.leadTimeMinutes} min | Score: ${(v.combinedScore * 100).toFixed(0)}%`).join('\n') 
  : '  • All monitored villages currently within baseline thresholds.'}

==================================================
3. TRANSPORTATION & ACCESS CORRIDORS
==================================================
- Blocked Critical Routes: ${criticalRoads.length}
${criticalRoads.length > 0 
  ? criticalRoads.map(r => `  • ${r.name}: ${r.status} at ${r.blockagePoint || 'Corridor'} (${r.reason})`).join('\n') 
  : '  • Primary transport corridors open; no active blockages.'}

==================================================
4. NDRF & RESPONSE TACTICAL STAGING
==================================================
- Deployed / En Route Units: ${activeNDRF.length}
${activeNDRF.length > 0 
  ? activeNDRF.map(t => `  • ${t.name} [${t.status}]: ${t.currentLocation} (ETA: ${t.estimatedTravelMinutes} min)`).join('\n') 
  : '  • All response units staged on STANDBY at designated bases.'}

==================================================
5. PROTOCOL DIRECTIVES & RECOMMENDED ACTIONS
==================================================
- ${veryHighRisk.length > 0 ? `Initiate targeted evacuation alerts for low-lying sectors of ${veryHighRisk.map(v => v.name).join(', ')}.` : 'Maintain regular telemetry polling and catchment monitoring.'}
- ${criticalRoads.length > 0 ? `Enforce traffic diversion around ${criticalRoads.map(r => r.name).join(', ')}.` : 'Maintain standard traffic routing.'}
- Pre-position swiftwater rescue boats and medical kits at forward staging nodes.

DISCLAIMER: DEMO SCENARIO DRAFT — Generated for prototype validation and EOC workflow demonstration. No real government transmission.`;
      
      setSitRepText(text);
      setIsGenerating(false);
    }, 600);
  };

  const [dispatched, setDispatched] = useState(false);

  const handleDownload = () => {
    if (!sitRepText) return;
    const blob = new Blob([sitRepText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `PRAVAH_SITREP_EKH_${new Date().toISOString().slice(0, 10)}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleDispatch = () => {
    setDispatched(true);
    setTimeout(() => setDispatched(false), 5000);
  };

  return (
    <div className="bg-surface-container-lowest rounded border border-outline-variant shadow-sm flex flex-col h-full overflow-hidden">
      <SectionHeader
        icon={<FileText size={18} />}
        title="SitRep Generator"
        badge="AUTO-DRAFT"
      />
      <div className="p-3 flex-1 flex flex-col">
        {dispatched && (
          <div className="mb-2 p-2 bg-[#dcfce7] border border-[#86efac] text-[#166534] rounded text-[11px] font-semibold flex items-center gap-1.5">
            ✓ Signed & Transmitted to State Emergency Operations Centre (SEOC) & MHA!
          </div>
        )}
        {sitRepText ? (
          <div className="flex-1 flex flex-col gap-2">
            {dispatchRecorded && <div className="p-2 bg-[#dcfce7] border border-[#86efac] text-[#166534] rounded text-[11px] font-semibold">Demo dispatch record saved in this session. No external transmission is connected.</div>}
            <textarea 
              readOnly 
              className="flex-1 w-full bg-surface-container-low border border-outline-variant rounded p-2 text-[11px] font-mono text-on-surface resize-none focus:outline-none"
              value={sitRepText}
            />
            <div className="flex items-center gap-2">
              <button 
                className="flex-1 h-8 bg-primary hover:bg-[#1e40af] text-white rounded text-[12px] font-semibold transition-colors flex items-center justify-center gap-1 active:scale-95 shadow-sm" 
                onClick={() => {
                  handleDispatch();
                  setDispatchRecorded(true);
                }}
              >
                <Send size={14} /> {dispatched || dispatchRecorded ? 'Dispatched to SDMA' : 'Dispatch to SDMA'}
              </button>
              <button 
                onClick={handleDownload}
                className="h-8 px-3 bg-surface-container-lowest border border-outline-variant hover:bg-surface-container rounded text-[12px] text-on-surface font-semibold flex items-center justify-center gap-1 active:scale-95"
              >
                <Download size={14} /> Download
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center gap-3">
            <p className="text-[12px] text-on-surface-variant text-center px-4">
              Auto-generate a standardized Incident Situation Report based on current telemetry, alerts, and NDRF staging.
            </p>
            <button 
              onClick={generateReport}
              disabled={isGenerating}
              className="px-4 h-9 bg-primary hover:bg-[#1e40af] text-white rounded text-[12px] font-semibold transition-colors flex items-center justify-center gap-2"
            >
              {isGenerating ? 'Compiling AI Analysis...' : 'Generate SitRep Draft'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
