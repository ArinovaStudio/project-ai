"use client"

import { useState } from "react"
import SubscriptionPlanForm from "@/components/admin/SubscriptionPlanForm"
import type { SubscriptionPlanFormData } from "@/lib/type/SubscriptionPlanFormData"

const mockPlans = [
  {
    id: "1",
    name: "Starter",
    price: 0,
    duration: 1,
    features: ["Basic access", "Community support"],
  },
  {
    id: "2",
    name: "Pro",
    price: 29,
    duration: 1,
    features: ["Unlimited projects", "Priority support"],
  },
]

export default function SubscriptionPlanPage() {
  const [showForm, setShowForm] = useState(false)
  const [editingData, setEditingData] =
    useState<SubscriptionPlanFormData | null>(null)

  async function handleCreate(data: SubscriptionPlanFormData) {
    console.log("CREATE PLAN", data)
    setShowForm(false)
  }

  async function handleUpdate(data: SubscriptionPlanFormData) {
    console.log("UPDATE PLAN", data)
    setShowForm(false)
    setEditingData(null)
  }

  return (
    <div className="relative p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Subscription Plans</h1>

        <button
          onClick={() => {
            setEditingData(null)
            setShowForm(true)
          }}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm"
        >
          Create Plan
        </button>
      </div>

      {/* Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mockPlans.map((plan) => (
          <div
            key={plan.id}
            className="rounded-lg border bg-card p-4 shadow-sm"
          >
            <h3 className="font-medium">{plan.name}</h3>
            <p className="text-sm text-muted-foreground">
              ${plan.price} / {plan.duration} month(s)
            </p>

            <ul className="mt-2 text-sm list-disc list-inside">
              {plan.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>

            <div className="mt-4 flex justify-end">
              <button
                onClick={() => {
                  setEditingData({
                    name: plan.name,
                    price: plan.price,
                    duration: plan.duration,
                    features: plan.features,
                  })
                  setShowForm(true)
                }}
                className="text-sm text-primary hover:underline"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* POPUP */}
      {showForm && (
        <div className="
          fixed inset-0 z-50
          flex items-center justify-center
          bg-black/60 backdrop-blur-md
        ">
          <SubscriptionPlanForm
            initialData={editingData}
            onSubmit={editingData ? handleUpdate : handleCreate}
            onCancel={() => {
              setShowForm(false)
              setEditingData(null)
            }}
          />
        </div>
      )}
    </div>
  )
}
