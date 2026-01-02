"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Check } from "lucide-react"
import { useState } from "react"
import type React from "react"

const plans = {
  starter: { name: "Starter", price: 0, period: "/month" },
  professional: { name: "Professional", price: 29, period: "/month" },
  enterprise: { name: "Enterprise", price: null, period: "Custom" },
}

export default function CheckoutContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const planId = searchParams.get("plan") || "professional"
  const plan = plans[planId as keyof typeof plans]

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    country: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((r) => setTimeout(r, 1500))
    setSubmitted(true)
    setIsSubmitting(false)
    setTimeout(() => router.push("/"), 2000)
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-3">Welcome!</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Your {plan?.name} account has been created successfully.
          </p>
          <p className="text-muted-foreground">Redirecting you back...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background px-4 py-16 sm:px-6 lg:px-8">
      {/* Back */}
      <div className="mx-auto max-w-2xl mb-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-primary hover:opacity-80 font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Plans
        </button>
      </div>

      <div className="mx-auto max-w-2xl">
        <h1 className="text-4xl font-bold text-foreground mb-12 text-center">
          Complete Your Purchase
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Form */}
          <div className="md:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-5">
              {["firstName", "lastName", "email", "phone", "company"].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {field}
                  </label>
                  <input
                    name={field}
                    value={(formData as any)[field]}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg
                      bg-background border border-border
                      focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              ))}

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Country</label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg
                    bg-background border border-border
                    focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Select a country</option>
                  <option value="US">United States</option>
                  <option value="IN">India</option>
                  <option value="JP">Japan</option>
                </select>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-11 mt-6"
              >
                {isSubmitting ? "Processing..." : "Complete Purchase"}
              </Button>
            </form>
          </div>

          {/* Summary */}
          <div className="md:col-span-1">
            <div className="bg-muted border border-border rounded-xl p-6 sticky top-8">
              <h2 className="text-lg font-bold text-foreground mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6 pb-6 border-b border-border">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{plan?.name} Plan</span>
                  <span className="font-semibold text-foreground">
                    {plan?.price !== null ? `$${plan?.price}${plan?.period}` : plan?.period}
                  </span>
                </div>
              </div>

              <div className="flex justify-between mb-6">
                <span className="text-lg font-bold text-foreground">Total</span>
                <span className="text-lg font-bold text-primary">
                  {plan?.price !== null ? `$${plan?.price}` : "Custom"}
                </span>
              </div>

              <p className="text-xs text-muted-foreground text-center">
                You will be charged when you complete this purchase.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
