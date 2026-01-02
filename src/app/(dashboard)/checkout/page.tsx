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

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    console.log("Checkout submitted:", { ...formData, planId })
    setSubmitted(true)
    setIsSubmitting(false)

    // Redirect after 2 seconds
    setTimeout(() => {
      router.push("/")
    }, 2000)
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-white px-4 py-16 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-3">Welcome!</h1>
          <p className="text-lg text-slate-600 mb-8">Your {plan?.name} account has been created successfully.</p>
          <p className="text-slate-500">Redirecting you back...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white px-4 py-16 sm:px-6 lg:px-8">
      {/* Back Button */}
      <div className="mx-auto max-w-2xl mb-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Plans
        </button>
      </div>

      {/* Checkout Container */}
      <div className="mx-auto max-w-2xl">
        <h1 className="text-4xl font-bold text-slate-900 mb-12 text-center">Complete Your Purchase</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="md:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* First Name */}
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="John"
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Doe"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="john@example.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              {/* Company */}
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">Company</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Your Company"
                />
              </div>

              {/* Country */}
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">Country</label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-all"
                >
                  <option value="">Select a country</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="UK">United Kingdom</option>
                  <option value="AU">Australia</option>
                  <option value="DE">Germany</option>
                  <option value="FR">France</option>
                  <option value="IN">India</option>
                  <option value="JP">Japan</option>
                </select>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white hover:bg-blue-700 font-semibold h-11 mt-6"
              >
                {isSubmitting ? "Processing..." : "Complete Purchase"}
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="md:col-span-1">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 sticky top-8">
              <h2 className="text-lg font-bold text-slate-900 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6 pb-6 border-b border-slate-200">
                <div className="flex justify-between">
                  <span className="text-slate-600">{plan?.name} Plan</span>
                  <span className="font-semibold text-slate-900">
                    {plan?.price !== null ? `$${plan?.price}${plan?.period}` : plan?.period}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Billing</span>
                  <span className="font-semibold text-slate-900">Monthly</span>
                </div>
              </div>

              <div className="flex justify-between mb-6">
                <span className="text-lg font-bold text-slate-900">Total</span>
                <span className="text-lg font-bold text-blue-600">
                  {plan?.price !== null ? `$${plan?.price}` : "Custom"}
                </span>
              </div>

              <p className="text-xs text-slate-500 text-center">
                You will be charged {plan?.price !== null ? `$${plan?.price}` : "a custom amount"} when you complete
                this purchase.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
