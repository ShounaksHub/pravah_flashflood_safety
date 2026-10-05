import { useAppStore } from '../../hooks/useAppStore';
import { RadioReceiver, MapPin, CheckCircle2 } from 'lucide-react';
import SectionHeader from './SectionHeader';
import { formatRelativeTime } from '../../utils/formatting';

export default function CitizenReportsQueue() {
  const { citizenReports, verifyCitizenReport, currentUser } = useAppStore();

  return (
    <div className="bg-surface-container-lowest rounded border border-outline-variant shadow-sm flex flex-col overflow-hidden h-full">
      <SectionHeader
        icon={<RadioReceiver size={18} />}
        title="Citizen Ground Reports"
        badge={`${citizenReports.filter(r => r.status !== 'RESOLVED').length} OPEN`}
      >
        <span className="font-mono text-[10px] text-on-surface-variant">CROWDSOURCED</span>
      </SectionHeader>

      <div className="flex-1 overflow-y-auto p-2 flex flex-col gap-2">
        {citizenReports.map(report => (
          <div key={report.id} className="p-2 bg-surface-container-low rounded border border-outline-variant flex flex-col gap-1.5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${
                  report.severity === 'CRITICAL' ? 'bg-error animate-pulse' :
                  report.severity === 'HIGH' ? 'bg-[#ea580c]' :
                  report.severity === 'MEDIUM' ? 'bg-[#eab308]' : 'bg-secondary'
                }`} />
                <span className="text-[10px] font-bold uppercase text-on-surface-variant">{report.category.replace('_', ' ')}</span>
              </div>
              <span className="text-[9px] font-mono text-on-surface-variant">{formatRelativeTime(report.reportedAt)}</span>
            </div>
            
            <div className="text-[12px] font-bold text-on-surface leading-snug">{report.title}</div>
            <p className="text-[11px] text-on-surface-variant leading-snug line-clamp-2">{report.description}</p>
            
            <div className="flex items-center gap-1 text-[10px] text-primary font-semibold">
              <MapPin size={10} />
              {report.location}
            </div>

            <div className="border-t border-surface-container mt-1 pt-1.5 flex items-center justify-between">
              <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase
                ${report.status === 'VERIFIED' ? 'bg-[#dcfce7] text-[#166534]' : 
                  report.status === 'PENDING' ? 'bg-[#fef3c7] text-[#92400e]' :
                  'bg-surface-container text-on-surface'}`}>
                {report.status}
              </span>
              
              <div className="flex gap-1">
                {report.status !== 'VERIFIED' ? (
                  <button 
                    className="h-6 px-2 bg-surface-container-lowest border border-outline-variant hover:bg-surface-container rounded text-[10px] text-on-surface font-semibold flex items-center gap-1 active:scale-95" 
                    onClick={() => verifyCitizenReport(report.id, currentUser?.name)}
                  >
                    <CheckCircle2 size={12} className="text-secondary" /> Verify Truth
                  </button>
                ) : (
                  <span className="text-[10px] text-secondary font-semibold flex items-center gap-1">
                    <CheckCircle2 size={12} /> Verified
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
