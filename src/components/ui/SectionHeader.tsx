import type { ReactNode } from 'react';

interface SectionHeaderProps {
  icon?: ReactNode;
  title: string;
  subtitle?: string;
  badge?: string;
  children?: ReactNode;
}

export default function SectionHeader({ icon, title, subtitle, badge, children }: SectionHeaderProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 px-2 py-1.5 bg-surface-container-low border-b border-outline-variant rounded-t">
      <div className="flex items-center gap-2">
        {icon && <span className="text-primary">{icon}</span>}
        <span className="text-headline-sm uppercase text-on-surface tracking-tight">{title}</span>
        {subtitle && <span className="text-code-sm text-on-surface-variant">{subtitle}</span>}
        {badge && <span className="px-1.5 py-0.5 rounded text-code-sm bg-surface-container border border-outline-variant text-on-surface-variant font-semibold">{badge}</span>}
      </div>
      {children && <div className="flex items-center gap-2 flex-wrap">{children}</div>}
    </div>
  );
}
