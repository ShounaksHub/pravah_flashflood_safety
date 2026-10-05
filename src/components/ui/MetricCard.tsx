import type { ReactNode } from 'react';

interface MetricCardProps {
  label: string;
  value: string | number;
  subtitle?: string;
  badge?: string;
  badgeVariant?: 'error' | 'warning' | 'success' | 'info' | 'primary';
  accentColor?: string;
  footer?: string;
  footerAction?: string;
  onFooterClick?: () => void;
  icon?: ReactNode;
  pulse?: boolean;
}

const badgeStyles = {
  error: 'bg-error-container text-on-error-container',
  warning: 'bg-tier3-bg text-tier3-text',
  success: 'bg-tier1-bg text-tier1-text',
  info: 'bg-surface-container text-on-surface-variant',
  primary: 'bg-primary-container text-on-primary font-semibold',
};

export default function MetricCard({ label, value, subtitle, badge, badgeVariant = 'info', accentColor, footer, footerAction, onFooterClick, icon, pulse }: MetricCardProps) {
  return (
    <div className="bg-surface-container-lowest p-2 rounded border border-outline-variant flex flex-col justify-between shadow-sm relative overflow-hidden">
      {accentColor && <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: accentColor }} />}
      <div className="flex items-center justify-between">
        <span className="text-label-caps text-on-surface-variant">{label}</span>
        {badge && <span className={`px-1.5 py-0.5 rounded text-code-sm text-[10px] font-bold ${badgeStyles[badgeVariant]}`}>{badge}</span>}
        {pulse && <span className="w-2 h-2 rounded-full bg-error animate-ping" />}
        {icon}
      </div>
      <div className="flex items-baseline gap-1 my-1">
        <span className="text-label-metric text-[26px]" style={{ color: accentColor }}>{value}</span>
        {subtitle && <span className="text-body-sm text-on-surface-variant">{subtitle}</span>}
      </div>
      {(footer || footerAction) && (
        <div className="flex items-center justify-between text-code-sm text-[10px] text-on-surface-variant pt-1 border-t border-surface-container">
          <span className="truncate">{footer}</span>
          {footerAction && (
            <button onClick={onFooterClick} className="text-primary hover:underline font-semibold whitespace-nowrap">{footerAction}</button>
          )}
        </div>
      )}
    </div>
  );
}
