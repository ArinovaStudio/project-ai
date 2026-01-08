"use client";

import { useEffect, useState } from "react";
import type { SubscriptionPlanFormData } from "@/lib/type/SubscriptionPlanFormData";

type Props = {
  initialData?: SubscriptionPlanFormData | null;
  onSubmit: (data: SubscriptionPlanFormData) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
};

export default function SubscriptionPlanForm({
  initialData,
  onSubmit,
  onCancel,
  loading = false,
}: Props) {
  const [form, setForm] = useState<SubscriptionPlanFormData>({
    name: "",
    price: 0,
    duration: 1,
    features: [],
  });

  const [featuresText, setFeaturesText] = useState("");

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
      setFeaturesText(initialData.features.join("\n"));
    }
  }, [initialData]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "duration"
          ? Number(value)
          : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await onSubmit({
      ...form,
      features: featuresText
        .split("\n")
        .map((f) => f.trim())
        .filter(Boolean),
    });
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
            {initialData ? "Edit Plan" : "Create Plan"}
          </h2>
          <p className="text-sm text-muted-foreground">
            {initialData
              ? "Update subscription plan details"
              : "Add a new subscription plan"}
          </p>
        </div>

        {/* Name */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium">Plan Name</label>
          <input
            name="name"
            value={form.name}
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

        {/* Price */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium">Price</label>
          <input
            type="number"
            name="price"
            value={form.price}
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

        {/* Duration */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium">
            Duration (months)
          </label>
          <input
            type="number"
            name="duration"
            value={form.duration}
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

        {/* Features */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium">
            Features (one per line)
          </label>
          <textarea
            rows={4}
            value={featuresText}
            onChange={(e) => setFeaturesText(e.target.value)}
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
