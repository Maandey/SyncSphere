import React, { ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "../../lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  className?: string;
  hover?: boolean;
  key?: React.Key;
}

export const Card = ({ children, className, hover = false, ...props }: CardProps) => {
  return (
    <div
      className={cn(
        "bg-zinc-950 border border-zinc-900 rounded shadow-none overflow-hidden",
        className
      )}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div className={cn("px-5 py-4 border-b border-zinc-900 bg-zinc-900/10", className)}>{children}</div>
);

export const CardContent = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div className={cn("p-5", className)}>{children}</div>
);

export const CardFooter = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div className={cn("px-5 py-3 border-t border-zinc-900 bg-zinc-900/5", className)}>{children}</div>
);
