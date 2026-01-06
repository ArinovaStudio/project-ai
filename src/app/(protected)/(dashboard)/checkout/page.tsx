"use client"

import { ArrowLeft } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

const plans = {
  starter: { name: "Starter", price: 0, period: "/month" },
  professional: { name: "Professional", price: 29, period: "/month" },
  enterprise: { name: "Enterprise", price: null, period: "Custom" },
}

export default function BillingForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const planId = searchParams.get("plan") || "professional"
  const plan = plans[planId as keyof typeof plans]

  const [formData, setFormData] = useState({
    fullName: '',
    country: 'India',
    state: '',
    city: '',
    zipCode: '',
    address1: '',
    address2: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen text-white p-6 ">
      {/* Background decorative elements */}
      {/* <div className="absolute inset-0 overflow-hidden pointer-events-none">
        Light mode blobs
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl opacity-20  dark:hidden" />
        <div className="absolute bottom-20 right-40 w-96 h-96 bg-purple-400 rounded-full blur-3xl opacity-20  dark:hidden" />

        Dark mode blobs
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-400 rounded-full blur-3xl opacity-30  hidden dark:block mix-blend-screen" />
        <div className="absolute bottom-20 right-40 w-96 h-96 bg-fuchsia-500 rounded-full blur-3xl opacity-30  hidden dark:block mix-blend-screen" />
      </div> */}
      <div className="max-w-5xl mx-auto bg-background">
        <button className="flex items-center gap-2 text-foreground/70 hover:text-foreground mb-2 sm:mt-5 text-sm cursor-pointer" onClick={() => router.back()}>
          <span><ArrowLeft size={15} /></span> Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-9">
          {/* Left side - Form */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-semibold mb-5 text-foreground">Billing details</h1>

            <div>
              <h2 className="font-semibold mb-2 text-foreground">Enter your name and address</h2>

              {/* Full Name */}
              <div className="mb-2">
                <label className="block text-sm text-foreground mb-1">
                  Full name*
                </label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="First and last name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-background dark:bg-neutral-900/20 border border-neutral-800 placeholder-foreground/40 dark:placeholder-gray-500 focus:outline-none text-foreground"
                />
              </div>

              {/* Country and State */}
              <div className="grid grid-cols-2 gap-4 mb-2">
                <div>
                  <label className="block text-sm text-foreground dark:text-gray-300 mb-1">
                    Country*
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-background dark:bg-neutral-900/20 border border-neutral-800 text-foreground focus:outline-none focus:border-neutral-700"
                  >
                    <option className='bg-background' value="India">🇮🇳 India</option>
                    <option className='bg-background' value="United States">🇺🇸 United States</option>
                    <option className='bg-background' value="United Kingdom">🇬🇧 United Kingdom</option>
                    <option className='bg-background' value="Canada">🇨🇦 Canada</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-foreground dark:text-gray-300 mb-1">
                    State/Region*
                  </label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-background dark:bg-neutral-900/20 border border-neutral-800 placeholder-foreground/40 dark:placeholder-gray-500 focus:outline-none text-foreground"
                  >
                    <option className='bg-background' value="">Select state/region</option>
                    <option className='bg-background' value="Maharashtra">Maharashtra</option>
                    <option className='bg-background' value="Delhi">Delhi</option>
                    <option className='bg-background' value="Karnataka">Karnataka</option>
                  </select>
                </div>
              </div>

              {/* City and Zip Code */}
              <div className="grid grid-cols-2 gap-4 mb-2">
                <div>
                  <label className="block text-sm text-foreground mb-1">
                    City*
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-background dark:bg-neutral-900/20 border border-neutral-800 placeholder-foreground/40 dark:placeholder-gray-500 focus:outline-none text-foreground"
                  />
                </div>
                <div>
                  <label className="block text-sm text-foreground mb-1">
                    Zip/postal code*
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-background dark:bg-neutral-900/20 border border-neutral-800 placeholder-foreground/40 dark:placeholder-gray-500 focus:outline-none text-foreground"
                  />
                </div>
              </div>

              {/* Address Line 1 */}
              <div className="mb-2">
                <label className="block text-sm text-foreground mb-1">
                  Address line 1*
                </label>
                <input
                  type="text"
                  name="address1"
                  placeholder="Street address"
                  value={formData.address1}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-background dark:bg-neutral-900/20 border border-neutral-800 placeholder-foreground/40 dark:placeholder-gray-500 focus:outline-none text-foreground"
                />
              </div>

              {/* Address Line 2 */}
              <div className="mb-2">
                <label className="block text-sm text-foreground mb-1">
                  Address line 2*
                </label>
                <input
                  type="text"
                  name="address2"
                  placeholder="Apt/Suite/Unit, etc"
                  value={formData.address2}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-background dark:bg-neutral-900/20 border border-neutral-800 placeholder-foreground/40 dark:placeholder-gray-500 focus:outline-none text-foreground"
                />
              </div>
            </div>
          </div>

          {/* Right side - Summary */}
          <div className="lg:col-span-1">
            <div className="bg-background dark:bg-neutral-900/20 rounded-lg p-6 shadow-[0_0_20px_rgba(0,0,0,0.2)] dark:shadow-[0_0_20px_rgba(255,255,255,0.1)]">
              <div className="flex justify-between items-start mb-2">
                <span className="text-foreground/70 dark:text-gray-300 text-sm">Plus plan</span>
                <span className="text-foreground">{plan.name}</span>
              </div>
              <div className="flex justify-between items-start mb-2">
                <span className="text-foreground/70 dark:text-gray-300 text-sm">Plan price</span>
                <span className="text-foreground">₹ {plan.price}</span>
              </div>
              <a href="#" className="text-blue-500 text-xs hover:underline">
                Have a promo code?
              </a>

              <div className="border-t border-neutral-800 my-6"></div>

              <div className="flex justify-between items-center mb-6">
                <span className="text-foreground font-medium">Total</span>
                <span className="text-foreground text-lg font-medium">₹ {plan.price}</span>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-foreground text-background font-medium py-3 rounded-lg hover:bg-foreground/90 cursor-pointer transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}