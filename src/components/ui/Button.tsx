import { ButtonHTMLAttributes, forwardRef } from "react";
import { motion, HTMLMotionProps } from "motion/react";
import { cn } from "../../lib/utils";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, children, ...props }, ref) => {
    const variants = {
      primary: "bg-zinc-100 text-zinc-950 hover:bg-zinc-200 shadow-sm",
      secondary: "bg-zinc-800 text-zinc-100 hover:bg-zinc-700",
      outline: "border border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900",
      ghost: "text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900/50",
      danger: "bg-red-950/20 text-red-500 border border-red-900/30 hover:bg-red-900/20",
    };

    const sizes = {
      sm: "px-3 py-1 text-[11px] font-bold uppercase tracking-tight",
      md: "px-4 py-2 text-xs font-semibold",
      lg: "px-6 py-2.5 text-sm font-semibold",
      icon: "p-2",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded transition-all focus:outline-none focus:ring-1 focus:ring-zinc-500 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed",
          variants[variant],
          sizes[size],
          className
        )}
        disabled={loading}
        {...(props as any)}
      >
        {loading ? (
          <div className="mr-2 h-3 w-3 animate-spin rounded-full border border-zinc-400 border-t-transparent" />
        ) : null}
        {children}
      </button>
    );
  }
);
