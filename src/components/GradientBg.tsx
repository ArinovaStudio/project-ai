export default function GradientBg() {
  return (
    <div
      aria-hidden
      className="
        pointer-events-none
        fixed inset-0
        -z-10
        w-screen h-screen
        overflow-hidden
      "
    >
      {/* Base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(
              135deg,
              var(--bg-base),
              var(--bg-grad-1),
              var(--bg-grad-2)
            )
          `,
        }}
      />

      {/* Soft purple wave */}
      <div
        className="absolute -top-32 left-1/4 h-[32rem] w-[32rem]
        rounded-full opacity-20 blur-[140px]"
        style={{ background: "var(--blob-purple)" }}
      />

      {/* Secondary depth */}
      <div
        className="absolute -bottom-40 right-1/4 h-[28rem] w-[28rem]
        rounded-full opacity-15 blur-[160px]"
        style={{ background: "var(--blob-indigo)" }}
      />
    </div>
  );
}
