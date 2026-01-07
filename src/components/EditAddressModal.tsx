"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

export function EditAddressModal({
  open,
  onClose,
  address,
}: {
  open: boolean;
  onClose: () => void;
  address: any | null;
}) {
  const [form, setForm] = useState({
    address1: "",
    address2: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
  });

  const isEdit = Boolean(address);

  // 🔑 RESET FORM WHEN OPEN
  useEffect(() => {
    if (open) {
      setForm({
        address1: address?.Address1 ?? "",
        address2: address?.Address2 ?? "",
        city: address?.city ?? "",
        state: address?.state ?? "",
        country: address?.country ?? "",
        postalCode: address?.zipCode ?? "",
      });
    }
  }, [open, address]);

  if (!open) return null;

  const save = async () => {
    const payload = {
      Address1: form.address1,
      Address2: form.address2 || null,
      city: form.city,
      state: form.state,
      country: form.country,
      zipCode: form.postalCode,
    };

    try {
      const res = await fetch("/api/user/address", {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to save address");
        return;
      }

      toast.success(isEdit ? "Address updated" : "Address added");
      onClose();
      location.reload(); // keep your current flow
    } catch {
      toast.error("Something went wrong");
    }
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
        <div className="px-6 pt-6 pb-4 border-b border-white/10">
          <h2 className="text-xl font-semibold">
            {isEdit ? "Edit Address" : "Add Address"}
          </h2>
          <p className="text-sm text-muted-foreground">
            Manage your address information.
          </p>
        </div>

        {/* BODY */}
        <div className="px-6 py-6 space-y-5">
          {[
            ["Address Line 1", "address1"],
            ["Address Line 2", "address2"],
            ["City", "city"],
            ["State", "state"],
            ["Country", "country"],
            ["Postal Code", "postalCode"],
          ].map(([label, key]) => (
            <div key={key} className="space-y-1">
              <label className="text-xs uppercase tracking-wide text-muted-foreground">
                {label}
              </label>
              <input
                value={(form as any)[key]}
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
        <div className="px-6 py-4 border-t border-white/10 flex justify-end gap-3">
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
