"use client";

import { useState } from "react";

export function TruncatedTextWithPopover({
  text,
}: {
  text?: string | null;
}) {
  const [open, setOpen] = useState(false);

  if (!text) return <span className="text-muted-foreground">—</span>;

  return (
    <div
      className="relative max-w-65"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Truncated line */}
      <p className="truncate cursor-pointer text-sm">
        {text}
      </p>

      {/* Popup */}
      {open && (
        <div className="absolute right-0 z-50 mt-2 max-w-sm rounded-md border bg-background p-3 text-sm shadow-lg">
          {text}
        </div>
      )}
    </div>
  );
}
