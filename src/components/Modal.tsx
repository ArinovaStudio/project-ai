"use client";

export function Modal({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-lg rounded-2xl bg-background p-6">
        {children}
        <div className="mt-4 text-right">
          <button onClick={onClose} className="text-sm text-muted-foreground">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
