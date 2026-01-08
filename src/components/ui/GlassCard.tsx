import { ReactNode } from "react";

type GlassCardProps = {
  children: ReactNode;
  className?: string;
};

export function GlassCard({ children, className = "" }: GlassCardProps) {
  return (
    <div
      className={`
        relative
        rounded-xl
        border border-black/10 dark:border-white/10

        /* Glass layer */
        bg-gradient-to-br
        from-white/10 to-white/5
        dark:from-white/10 dark:to-white/5

        backdrop-blur-xl
        shadow-[0_8px_32px_rgba(0,0,0,0.25)]
        p-6
        ${className}
      `}
    >
      {children}
    </div>
  );
}
