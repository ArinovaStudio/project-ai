"use client"

import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface SubscriptionCardProps {
  id: string
  name: string
  price: number | null
  period: string
  description: string
  features: string[]
  cta: string
  highlighted: boolean
  isSelected: boolean
  onSelect: () => void
}

export default function SubscriptionCard({
  name,
  price,
  period,
  description,
  features,
  cta,
  highlighted,
  isSelected,
  onSelect,
}: SubscriptionCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col",
        highlighted
          ? "border-blue-300 bg-gradient-to-b from-blue-50 to-white shadow-lg shadow-blue-200/50 ring-1 ring-blue-300 md:scale-105"
          : "border-slate-200 bg-white hover:border-slate-300 shadow-sm",
      )}
    >
      {/* Recommended Badge */}
      {highlighted && (
        <div className="absolute top-4 right-4 inline-block rounded-full bg-blue-600 px-3 py-1">
          <span className="text-xs font-semibold text-white">Recommended</span>
        </div>
      )}

      {/* Card Content */}
      <div className="p-8 flex flex-col h-full">
        {/* Header */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-slate-900 mb-2">{name}</h3>
          <p className="text-sm text-slate-600 mb-6">{description}</p>

          {/* Price */}
          <div className="flex items-baseline gap-1">
            {price !== null ? (
              <>
                <span className="text-5xl font-bold text-slate-900">${price}</span>
                <span className="text-slate-600">{period}</span>
              </>
            ) : (
              <span className="text-3xl font-semibold text-slate-900">Custom Pricing</span>
            )}
          </div>
        </div>

        {/* Features List */}
        <div className="space-y-4 mb-8 flex-1">
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <Check className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <span className="text-sm text-slate-700">{feature}</span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <Button
          onClick={onSelect}
          className={cn(
            "w-full font-semibold transition-all duration-300 h-11",
            highlighted ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-slate-200 text-slate-900 hover:bg-slate-300",
          )}
        >
          {cta}
        </Button>
      </div>
    </div>
  )
}
