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
    <form
      onSubmit={handleSubmit}
      className="
    w-full max-w-xl rounded-xl
    bg-card border border-border
    shadow-2xl ring-1 ring-border/50
    p-8 space-y-6
    animate-in fade-in zoom-in-95
  "
    >
      {/* Header */}
      <div className="space-y-1 border-b border-border pb-4">
        <h2 className="text-lg font-semibold tracking-tight">
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
          className="w-full rounded-md border border-border px-3 py-2 text-sm
          transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
          className="w-full rounded-md border border-border px-3 py-2 text-sm
          transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
            className="w-full rounded-md border border-border px-3 py-2 text-sm
            transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
            className="w-full rounded-md border border-border px-3 py-2 text-sm
            transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 border-t border-border pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md px-4 py-2 text-sm text-muted-foreground
          hover:bg-muted transition"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-primary px-5 py-2 text-sm font-medium
          text-primary-foreground hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? "Saving..." : initialData ? "Update" : "Create"}
        </button>
      </div>
    </form>
  );
}
