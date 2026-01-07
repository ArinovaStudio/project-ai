export function GlassCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-3xl p-6 backdrop-blur-xl bg-background/20 border border-white/20 shadow-[inset_0_0_10px_rgba(255,255,255,0.1)]">
      {children}
    </div>
  );
}
