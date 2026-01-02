"use client"

import { useEffect, useState } from "react"
import type { SubscriptionPlanFormData } from "@/lib/type/SubscriptionPlanFormData"

type Props = {
  initialData?: SubscriptionPlanFormData | null
  onSubmit: (data: SubscriptionPlanFormData) => Promise<void>
  onCancel: () => void
  loading?: boolean
}

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
  })

  const [featuresText, setFeaturesText] = useState("")

  useEffect(() => {
    if (initialData) {
      setForm(initialData)
      setFeaturesText(initialData.features.join("\n"))
    }
  }, [initialData])

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: name === "price" || name === "duration" ? Number(value) : value,
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    await onSubmit({
      ...form,
      features: featuresText
        .split("\n")
        .map((f) => f.trim())
        .filter(Boolean),
    })
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
          className="w-full rounded-md border px-3 py-2 text-sm"
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
          className="w-full rounded-md border px-3 py-2 text-sm"
        />
      </div>

      {/* Duration */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium">Duration (months)</label>
        <input
          type="number"
          name="duration"
          value={form.duration}
          onChange={handleChange}
          required
          className="w-full rounded-md border px-3 py-2 text-sm"
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
          className="w-full rounded-md border px-3 py-2 text-sm"
        />
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 border-t pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm text-muted-foreground hover:bg-muted rounded-md"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md"
        >
          {loading ? "Saving..." : initialData ? "Update" : "Create"}
        </button>
      </div>
    </form>
  )
}
