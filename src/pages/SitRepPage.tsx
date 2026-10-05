import SitRepGenerator from '../components/ui/SitRepGenerator';
import { FileText, Award } from 'lucide-react';

export default function SitRepPage() {
  return (
    <div className="flex flex-col gap-4">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 bg-surface-container-low p-3 rounded border border-outline-variant">
        <div>
          <h2 className="text-headline-sm uppercase tracking-tight text-primary font-bold flex items-center gap-2">
            <FileText size={20} />
            Statutory Situation Report (SitRep) Generator
          </h2>
          <p className="text-code-sm text-on-surface-variant">
            Prototype multi-agency operational report draft structured for NDMA/MHA-style review. External submission remains manual in this MVP.
          </p>
        </div>
        <div className="flex items-center gap-2 font-mono text-code-sm">
          <span className="px-2.5 py-1 rounded bg-surface-container text-on-surface font-bold border border-outline">
            PROTOTYPE FORMAT
          </span>
        </div>
      </div>

      {/* Main Generator Console */}
      <SitRepGenerator />

      {/* Compliance Advisory */}
      <div className="bg-surface-container-low p-3.5 rounded border border-outline-variant flex items-center gap-3">
        <Award size={24} className="text-primary flex-shrink-0" />
        <p className="text-code-sm text-on-surface-variant leading-relaxed">
          <strong>Statutory Compliance Note:</strong> MVP governance note: AI-assisted drafts require review and endorsement by the designated District Emergency Officer before any external relay.
        </p>
      </div>
    </div>
  );
}
