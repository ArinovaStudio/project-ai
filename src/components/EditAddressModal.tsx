"use client";

import { useState, useEffect } from "react";

export function EditAddressModal({
  open,
  onClose,
  address,
}: {
  open: boolean;
  onClose: () => void;
  address: any;
}) {
  const [form, setForm] = useState({
    address1: "",
    address2: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
  });

  // 🔑 RESET FORM EVERY TIME MODAL OPENS
  useEffect(() => {
    if (open) {
      setForm({
        address1: address?.address1 ?? "",
        address2: address?.address2 ?? "",
        city: address?.city ?? "",
        state: address?.state ?? "",
        country: address?.country ?? "",
        postalCode: address?.postalCode ?? "",
      });
    }
  }, [open, address]);

  if (!open) return null;

  const save = async () => {
    await fetch("/api/user/update-address", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    onClose();         // auto-close
    location.reload(); // keep your existing behavior
  };

  return (
    /* 🌑 BACKDROP — click closes modal */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md"
      onClick={onClose}
    >
      {/* 🧊 GLASS CARD */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          relative w-full max-w-lg rounded-3xl
          border border-white/20
          bg-white/70 dark:bg-neutral-900/60
          backdrop-blur-xl
          shadow-[0_20px_60px_rgba(0,0,0,0.4)]
          dark:shadow-[0_20px_60px_rgba(0,0,0,0.8)]
        "
      >
        {/* inner glow */}
        <div className="absolute inset-0 rounded-3xl ring-1 ring-white/10 pointer-events-none" />

        {/* HEADER */}
        <div className="relative px-6 pt-6 pb-4 border-b border-white/10">
          <h2 className="text-xl font-semibold text-foreground">
            Address Information
          </h2>
          <p className="text-sm text-muted-foreground">
            Update your address details.
          </p>
        </div>

        {/* BODY */}
        <div className="relative px-6 py-6 space-y-5">
          {(
            [
              ["Address Line 1", "address1"],
              ["Address Line 2", "address2"],
              ["City", "city"],
              ["State", "state"],
              ["Country", "country"],
              ["Postal Code", "postalCode"],
            ] as const
          ).map(([label, key]) => (
            <div key={key} className="space-y-1">
              <label className="text-xs uppercase tracking-wide text-muted-foreground">
                {label}
              </label>
              <input
                value={form[key]}
                onChange={(e) =>
                  setForm({ ...form, [key]: e.target.value })
                }
                className="
                  w-full rounded-xl
                  border border-black/10 dark:border-white/15
                  bg-white/80 dark:bg-neutral-800/60
                  px-4 py-2 text-sm text-foreground
                  outline-none
                  focus:ring-2 focus:ring-cyan-400/50
                "
              />
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div className="relative px-6 py-4 border-t border-white/10 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="cursor-pointer rounded-xl px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:text-foreground"
          >
            Cancel
          </button>
          <button
            onClick={save}
            className="cursor-pointer rounded-xl bg-linear-to-r from-blue-500 to-cyan-500 px-5 py-2 text-sm font-medium text-white shadow-lg"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
