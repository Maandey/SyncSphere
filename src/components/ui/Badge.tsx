import React, { ReactNode } from "react";
import { cn } from "../../lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  variant?: 'slate' | 'indigo' | 'emerald' | 'rose' | 'amber';
  className?: string;
  key?: React.Key;
}

export const Badge = ({ children, variant = 'slate', className, ...props }: BadgeProps) => {
  const variants = {
    slate: "bg-zinc-800 text-zinc-400 border-zinc-700",
    indigo: "bg-zinc-100 text-zinc-950 border-zinc-200",
    emerald: "bg-emerald-950/20 text-emerald-500 border-emerald-900/30",
    rose: "bg-red-950/20 text-red-500 border-red-900/30",
    amber: "bg-amber-950/20 text-amber-500 border-amber-900/30",
  };

  return (
    <span className={cn(
      "px-1.5 py-0.5 text-[9px] font-black uppercase tracking-widest border rounded-sm",
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
};
