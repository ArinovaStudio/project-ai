"use client";

import { useState, useEffect } from "react";
import type { CollaborationFormData } from "@/lib/type/CollaborationFormData";

type Props = {
  initialData?: CollaborationFormData | null;
  onSubmit: (data: CollaborationFormData) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
};

export default function CollaborationForm({
  initialData,
  onSubmit,
  onCancel,
  loading = false,
}: Props) {
  const [form, setForm] = useState<CollaborationFormData>({
    title: "",
    description: "",
    budget: 0,
    timeline: "",
  });

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "budget" ? Number(value) : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await onSubmit(form);
  }

  return (
    <div
      className="
        w-full max-w-xl
        rounded-xl

        border
        border-black/10
        dark:border-white/10

        bg-[linear-gradient(135deg,rgba(255,255,255,0.9),rgba(255,255,255,0.6))]
        dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.12),rgba(255,255,255,0.04))]

        backdrop-blur-xl
        backdrop-saturate-150

        shadow-[0_8px_32px_rgba(0,0,0,0.18)]
        dark:shadow-[0_8px_32px_rgba(0,0,0,0.35)]

        p-6 sm:p-8
      "
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Header */}
        <div className="space-y-1 border-b border-black/10 dark:border-white/10 pb-4">
          <h2 className="text-lg font-semibold">
            {initialData ? "Edit Collaboration" : "Create Collaboration"}
          </h2>
          <p className="text-sm text-muted-foreground">
            {initialData
              ? "Update collaboration details"
              : "Add a new collaboration opportunity"}
          </p>
        </div>

        {/* Title */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium">Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="
              w-full rounded-md
              bg-transparent
              border border-black/10 dark:border-white/10
              px-3 py-2 text-sm
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-primary
            "
          />
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={form.description || ""}
            onChange={handleChange}
            rows={4}
            className="
              w-full rounded-md
              bg-transparent
              border border-black/10 dark:border-white/10
              px-3 py-2 text-sm
              resize-none
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-primary
            "
          />
        </div>

        {/* Budget + Timeline */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Budget</label>
            <input
              type="number"
              name="budget"
              value={form.budget}
              onChange={handleChange}
              required
              className="
                w-full rounded-md
                bg-transparent
                border border-black/10 dark:border-white/10
                px-3 py-2 text-sm
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-primary
              "
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium">Timeline</label>
            <input
              type="date"
              name="timeline"
              value={form.timeline}
              onChange={handleChange}
              required
              className="
                w-full rounded-md
                bg-transparent
                border border-black/10 dark:border-white/10
                px-3 py-2 text-sm
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-primary
              "
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 border-t border-black/10 dark:border-white/10 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="
              px-4 py-2 text-sm
              text-muted-foreground
              hover:text-red-600
              rounded-md
              cursor-pointer
            "
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="
              px-5 py-2 text-sm font-medium
              rounded-md
              bg-primary
              text-primary-foreground
              disabled:opacity-50
              cursor-pointer
            "
          >
            {loading ? "Saving..." : initialData ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
}
