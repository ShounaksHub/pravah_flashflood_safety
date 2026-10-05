import type { ReactNode } from 'react';
import { useAppStore } from '../../hooks/useAppStore';
import { ArrowRight, Home, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DEMO_ACCOUNTS } from '../../data/mock/demoAccounts';

interface RoleGuardProps {
  children: ReactNode;
  routePath: string;
  requiredClearance?: string;
}

export default function RoleGuard({ children, routePath, requiredClearance }: RoleGuardProps) {
  const { currentUser, login } = useAppStore();
  const navigate = useNavigate();

  // If user has allowedRoutes defined and current route is not allowed
  const isRestricted = currentUser && currentUser.allowedRoutes && !currentUser.allowedRoutes.includes(routePath);

  if (isRestricted) {
    const recommendedAccount = DEMO_ACCOUNTS.find(a => a.allowedRoutes.includes(routePath)) || DEMO_ACCOUNTS[0];

    return (
      <div className="max-w-3xl mx-auto py-12 px-4 flex flex-col items-center">
        <div className="w-full bg-[#ffffff] rounded-xl border-2 border-[#ba1a1a]/30 p-8 shadow-md flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-[#fee2e2] flex items-center justify-center text-[#ba1a1a] mb-4">
            <Lock size={32} />
          </div>

          <span className="px-3 py-1 rounded bg-[#fee2e2] text-[#991b1b] font-mono text-[11px] font-bold uppercase tracking-wider mb-2">
            Statutory Clearance Restriction
          </span>

          <h2 className="text-[24px] font-bold text-[#0b1c30] leading-tight">
            Access Restricted to Authorized Clearance Tier
          </h2>

          <p className="text-[14px] text-[#444653] mt-2 max-w-xl leading-relaxed">
            Your currently authenticated operational profile (<strong>{currentUser?.name}</strong> — <code className="bg-[#e5eeff] text-[#00288e] px-1.5 py-0.5 rounded text-[12px]">{currentUser?.role}</code>) does not hold statutory clearance for this tactical console.
          </p>

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 my-6 text-left text-code-sm">
            <div className="p-3 rounded bg-[#f4f6fc] border border-[#c4c5d5]">
              <span className="text-[10px] font-mono uppercase text-[#444653] block">Current Clearance</span>
              <strong className="text-[#0b1c30]">{currentUser?.clearanceLevel}</strong>
            </div>
            <div className="p-3 rounded bg-[#eff4ff] border border-[#c4c5d5]">
              <span className="text-[10px] font-mono uppercase text-[#00288e] block">Required Clearance</span>
              <strong className="text-[#00288e]">{requiredClearance || 'LEVEL 4 — STATUTORY COMMAND'}</strong>
            </div>
          </div>

          <div className="p-3 rounded bg-[#fff7ed] border border-[#fed7aa] text-[12px] text-[#9a3412] text-left w-full mb-6">
            <strong>Disaster Governance Note:</strong> Under the Disaster Management Act 2005 (Section 30), statutory alerts and high-level mobilization orders remain strictly restricted to authorized statutory command tiers.
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center">
            <button
              onClick={() => navigate('/command')}
              className="w-full sm:w-auto h-9 px-4 rounded border border-[#c4c5d5] text-[13px] font-semibold text-[#444653] hover:bg-[#f4f6fc] transition-colors flex items-center justify-center gap-2"
            >
              <Home size={15} /> Return to Command Overview
            </button>

            <button
              onClick={() => {
                login(recommendedAccount);
              }}
              className="w-full sm:w-auto h-9 px-5 rounded bg-[#00288e] hover:bg-blue-900 text-white text-[13px] font-bold transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              Switch to {recommendedAccount.name.split(',')[0]} ({recommendedAccount.role === 'DISTRICT_EMERGENCY_OFFICER' ? 'DEO' : 'Admin'})
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
