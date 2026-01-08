import { ReactNode } from "react";

export function InfoRow({
  label,
  value,
  mono,
}: {
  label: string;
  value?: ReactNode;
  mono?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-1">
      <span className="text-sm text-muted-foreground">{label}</span>

      <div
        className={`text-sm text-right ${
          mono ? "font-mono" : ""
        }`}
      >
        {value ?? "—"}
      </div>
    </div>
  );
}
