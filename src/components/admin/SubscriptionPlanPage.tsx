"use client";

import { useState } from "react";
import { Poppins } from "next/font/google";

import SubscriptionPlanForm from "@/components/admin/SubscriptionPlanForm";
import type { SubscriptionPlanFormData } from "@/lib/type/SubscriptionPlanFormData";
import { GlassCard } from "@/components/ui/GlassCard";
import GradientBg from "@/components/GradientBg";

// ONE font, multiple weights (same as Collaboration)
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

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
];

export default function SubscriptionPlanPage() {
  const [showForm, setShowForm] = useState(false);
  const [editingData, setEditingData] =
    useState<SubscriptionPlanFormData | null>(null);

  async function handleCreate(data: SubscriptionPlanFormData) {
    console.log("CREATE PLAN", data);
    setShowForm(false);
  }

  async function handleUpdate(data: SubscriptionPlanFormData) {
    console.log("UPDATE PLAN", data);
    setShowForm(false);
    setEditingData(null);
  }

  return (
    <>
      {/* Background */}
      <GradientBg />

      {/* Base font */}
      <div className={`relative z-10 p-6 space-y-6 ${poppins.className}`}>
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">
            Subscription Plans
          </h1>

          <button
            onClick={() => {
              setEditingData(null);
              setShowForm(true);
            }}
            className="
              rounded-md
              bg-primary
              px-4 py-2
              text-sm font-medium
              text-primary-foreground
              hover:opacity-90
              transition
              cursor-pointer
            "
          >
            Create Plan
          </button>
        </div>

        {/* Glass Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {mockPlans.map((plan) => (
            <GlassCard
              key={plan.id}
              className="p-4 hover:shadow-xl transition"
            >
              <h3 className="font-semibold text-base">
                {plan.name}
              </h3>

              <p className="text-sm text-muted-foreground mt-1">
                ${plan.price} / {plan.duration} month(s)
              </p>

              <ul className="mt-3 space-y-1 text-sm list-disc list-inside text-muted-foreground">
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
                    });
                    setShowForm(true);
                  }}
                  className="text-sm font-medium text-primary hover:underline cursor-pointer"
                >
                  Edit
                </button>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Popup */}
        {showForm && (
          <div
            className="
              fixed inset-0 z-50
              flex items-center justify-center
              bg-black/60
              backdrop-blur-md
            "
          >
            <SubscriptionPlanForm
              initialData={editingData}
              onSubmit={editingData ? handleUpdate : handleCreate}
              onCancel={() => {
                setShowForm(false);
                setEditingData(null);
              }}
            />
          </div>
        )}
      </div>
    </>
  );
}
