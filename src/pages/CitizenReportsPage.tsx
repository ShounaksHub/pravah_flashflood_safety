import { useState } from 'react';
import CitizenReportsQueue from '../components/ui/CitizenReportsQueue';
import { MessageSquareWarning, PlusCircle, CheckCircle2, Camera, Send } from 'lucide-react';
import { useAppStore } from '../hooks/useAppStore';
import type { CitizenReport, ReportCategory, ReportSeverity } from '../types/reports';

export default function CitizenReportsPage() {
  const { addCitizenReport } = useAppStore();
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [submittedToast, setSubmittedToast] = useState(false);

  // Form state
  const [category, setCategory] = useState<ReportCategory>('RISING_WATER');
  const [severity, setSeverity] = useState<ReportSeverity>('HIGH');
  const [location, setLocation] = useState('Mawsynram Market Road');
  const [description, setDescription] = useState('');
  const [reportedBy, setReportedBy] = useState('Field Officer J. Marak');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    const newReport: CitizenReport = {
      id: `CR-${Date.now().toString().slice(-4)}`,
      category,
      severity,
      title: `${category.replace('_', ' ')} Incident at ${location}`,
      description,
      location,
      latitude: 25.2972,
      longitude: 91.5822,
      reportedBy,
      reportedAt: new Date().toISOString(),
      status: 'PENDING',
    };

    addCitizenReport(newReport);
    setDescription('');
    setShowSubmitModal(false);
    setSubmittedToast(true);
    setTimeout(() => setSubmittedToast(false), 3500);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 bg-surface-container-low p-3 rounded border border-outline-variant">
        <div>
          <h2 className="text-headline-sm uppercase tracking-tight text-primary font-bold flex items-center gap-2">
            <MessageSquareWarning size={20} />
            Citizen & Field Officer Geo-Tagged Ground Truth Intake
          </h2>
          <p className="text-code-sm text-on-surface-variant">
            Crowdsourced and field ranger incident triage queue with evidence-ready verification and direct tactical escalation workflow.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSubmitModal(!showSubmitModal)}
            className="h-8 px-3 rounded bg-primary text-white text-code-sm font-semibold hover:bg-blue-900 transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <PlusCircle size={14} />
            Log New Ground Report
          </button>
        </div>
      </div>

      {submittedToast && (
        <div className="p-3 bg-[#dcfce7] border border-[#86efac] text-[#166534] rounded text-body-sm font-semibold flex items-center gap-2">
          <CheckCircle2 size={18} />
          New ground report logged successfully and queued for tactical review!
        </div>
      )}

      {/* Field Report Submission Modal / Drawer */}
      {showSubmitModal && (
        <div className="bg-surface-container-lowest rounded border-2 border-primary p-4 shadow-md flex flex-col gap-3">
          <div className="flex items-center justify-between border-b border-outline-variant pb-2">
            <span className="text-headline-sm font-bold text-on-surface flex items-center gap-2">
              <Camera size={18} className="text-primary" />
              File Incident Report (Field Operator Terminal)
            </span>
            <button 
              onClick={() => setShowSubmitModal(false)}
              className="text-on-surface-variant hover:text-on-surface text-body-sm font-bold"
            >
              ✕ Close
            </button>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-3 text-body-sm">
            <div className="flex flex-col gap-1">
              <label className="text-label-caps text-on-surface-variant font-bold">Incident Category:</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ReportCategory)}
                className="h-8 px-2 bg-surface-container-low border border-outline-variant rounded focus:outline-none focus:border-primary"
              >
                <option value="RISING_WATER">Rapid Rising Water / Flash Runoff</option>
                <option value="STREAM_OVERFLOW">Stream / River Overflowing</option>
                <option value="ROAD_BLOCKAGE">Road Blocked by Mud / Water</option>
                <option value="LANDSLIDE">Active Landslide / Rockfall</option>
                <option value="SLOPE_CRACK">Slope Tension Crack Observed</option>
                <option value="INFRASTRUCTURE_DAMAGE">Bridge / Culvert Structural Damage</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-label-caps text-on-surface-variant font-bold">Severity Level:</label>
              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value as ReportSeverity)}
                className="h-8 px-2 bg-surface-container-low border border-outline-variant rounded focus:outline-none focus:border-primary font-bold"
              >
                <option value="CRITICAL">CRITICAL (Immediate Life Threat)</option>
                <option value="HIGH">HIGH (Severe Hazard)</option>
                <option value="MEDIUM">MEDIUM (Moderate Risk)</option>
                <option value="LOW">LOW (Informational)</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-label-caps text-on-surface-variant font-bold">Geo-Tagged Location:</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="h-8 px-2 bg-surface-container-low border border-outline-variant rounded focus:outline-none focus:border-primary"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-label-caps text-on-surface-variant font-bold">Reporting Officer / Citizen:</label>
              <input
                type="text"
                value={reportedBy}
                onChange={(e) => setReportedBy(e.target.value)}
                className="h-8 px-2 bg-surface-container-low border border-outline-variant rounded focus:outline-none focus:border-primary"
              />
            </div>

            <div className="md:col-span-2 flex flex-col gap-1">
              <label className="text-label-caps text-on-surface-variant font-bold">Incident Observation Notes:</label>
              <textarea
                rows={3}
                placeholder="Describe water depth, stream velocity, road condition, or trapped persons..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="p-2 bg-surface-container-low border border-outline-variant rounded focus:outline-none focus:border-primary"
                required
              />
            </div>

            <div className="md:col-span-2 flex justify-end gap-2 pt-2 border-t border-outline-variant">
              <button
                type="button"
                onClick={() => setShowSubmitModal(false)}
                className="h-8 px-3 rounded border border-outline-variant text-body-sm hover:bg-surface-container transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="h-8 px-4 rounded bg-primary text-white font-bold text-body-sm hover:bg-blue-900 transition-colors flex items-center gap-1.5"
              >
                <Send size={14} /> Submit Ground Report
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Main Reports Queue Component */}
      <CitizenReportsQueue />
    </div>
  );
}
