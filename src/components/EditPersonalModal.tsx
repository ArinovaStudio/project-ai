"use client";

import { useState, useEffect } from "react";
import { User } from "@/lib/type/type";

export function EditPersonalModal({
  open,
  onClose,
  user,
}: {
  open: boolean;
  onClose: () => void;
  user: User;
}) {
  const [form, setForm] = useState({
    name: user.name ?? "",
    phoneNumber: user.phoneNumber ?? "",
    dateOfBirth: user.dateOfBirth ?? "",
  });

  // ✅ RESET FORM EVERY TIME MODAL OPENS
  useEffect(() => {
    if (open) {
      setForm({
        name: user.name ?? "",
        phoneNumber: user.phoneNumber ?? "",
        dateOfBirth: user.dateOfBirth ?? "",
      });
    }
  }, [open, user]);

  if (!open) return null;

  const save = async () => {
    await fetch(`/api/user/edit?user=${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: form.name,
        phoneNumber: form.phoneNumber,
        dateOfBirth: form.dateOfBirth,
      }),
    });

    onClose();
    location.reload();
  };


  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md"
      onClick={onClose}
    >
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
        <div className="absolute inset-0 rounded-3xl ring-1 ring-white/10 pointer-events-none" />

        {/* HEADER */}
        <div className="relative px-6 pt-6 pb-4 border-b border-white/10">
          <h2 className="text-xl font-semibold text-foreground">
            Personal Information
          </h2>
          <p className="text-sm text-muted-foreground">
            Update your personal details. Email cannot be changed.
          </p>
        </div>

        {/* BODY */}
        <div className="relative px-6 py-6 space-y-5">
          <div className="space-y-1">
            <label className="text-xs uppercase tracking-wide text-muted-foreground">
              Full Name
            </label>
            <input
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
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

          <div className="space-y-1">
            <label className="text-xs uppercase tracking-wide text-muted-foreground">
              Email Address
            </label>
            <input
              value={user.email}
              disabled
              className="
                w-full rounded-xl
                border border-black/10 dark:border-white/10
                bg-neutral-200/70 dark:bg-neutral-800/40
                px-4 py-2 text-sm
                text-neutral-600 dark:text-neutral-400
                cursor-not-allowed
              "
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs uppercase tracking-wide text-muted-foreground">
              Phone Number
            </label>
            <input
              value={form.phoneNumber}
              onChange={(e) =>
                setForm({ ...form, phoneNumber: e.target.value })
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

          <div className="space-y-1">
            <label className="text-xs uppercase tracking-wide text-muted-foreground">
              Date of Birth
            </label>
            <input
              type="date"
              value={form.dateOfBirth ?? ""}
              onChange={(e) =>
                setForm({ ...form, dateOfBirth: e.target.value })
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
