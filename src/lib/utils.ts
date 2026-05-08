import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatXP(xp: number): string {
  if (xp >= 1000) return `${(xp / 1000).toFixed(1)}k`;
  return xp.toString();
}

export function getStatusColor(status: string) {
  switch (status) {
    case 'todo': return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    case 'in_progress': return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
    case 'review': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    case 'completed': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
  }
}

export function getPriorityColor(priority: string) {
  switch (priority) {
    case 'urgent': return 'text-rose-400';
    case 'high': return 'text-orange-400';
    case 'medium': return 'text-amber-400';
    case 'low': return 'text-emerald-400';
    default: return 'text-slate-400';
  }
}
