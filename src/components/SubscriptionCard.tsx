"use client"

import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface SubscriptionCardProps {
  id: string
  name: string
  price: number | null
  duration: string
  description: string
  features: string[]
  isRecommended: boolean
  isSelected: boolean
  onSelect: () => void
}

export default function SubscriptionCard({
  name,
  price,
  duration,
  description,
  features,
  isRecommended,
  isSelected,
  onSelect,
}: SubscriptionCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col backdrop-blur-xl bg-white/10 dark:bg-black/20 ",
        isRecommended
          ? "border-primary/40 shadow-[0_0_45px_rgba(59,130,246,0.35)] ring-1 ring-primary/40 md:scale-105 hover:scale-[1.1]"
          : "border-white/20 dark:border-white/10 shadow-sm hover:scale-[1.02]",
      )}
    >
      {/* Glass Gradient Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/20 via-white/5 to-transparent dark:from-white/10 dark:via-transparent" />

      {/* Recommended Badge */}
      {isRecommended && (
        <>
          {/* Glow */}
          <div className="absolute -top-6 -right-6 w-28 h-28 bg-blue-500/30 blur-3xl rounded-full" />

          <div className="absolute top-4 right-4 z-10">
            <div className="rounded-full bg-blue-600/90 backdrop-blur-md px-4 py-1.5 shadow-lg">
              <span className="text-xs font-semibold text-white tracking-wide">
                Recommended
              </span>
            </div>
          </div>
        </>
      )}

      {/* Card Content */}
      <div className="relative p-8 flex flex-col h-full">
        {/* Header */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-foreground mb-2">
            {name}
          </h3>

          <p className="text-sm text-muted-foreground mb-6">
            {description}
          </p>

          {/* Price */}
          <div className="flex items-baseline gap-1">
            {price !== null ? (
              <>
                <span className="text-5xl font-bold text-foreground">
                  ${price}
                </span>
                {price !== 0 && <span className="text-muted-foreground">
                  {duration} days
                </span>}
              </>
            ) : (
              <span className="text-3xl font-semibold text-foreground">
                Custom Pricing
              </span>
            )}
          </div>
        </div>

        {/* Features */}
        <div className="space-y-4 mb-8 flex-1">
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <Check className="w-5 h-5 text-blue-500 shrink-0 mt-0.5 drop-shadow" />
              <span className="text-sm text-muted-foreground">
                {feature}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Button
          onClick={price !== 0 ? onSelect : undefined}
          className={cn(
            "w-full h-11 font-semibold transition-all duration-200 cursor-pointer backdrop-blur",
            isRecommended
              ? "bg-blue-600 text-white shadow-lg shadow-blue-600/40 hover:bg-blue-700 hover:scale-[1.02]"
              : "bg-gray-400/30 text-foreground hover:bg-gray-400/40 hover:scale-[1.02]",
          )}
        >
          {price === 0 ? "Free" : "Buy Now"}
        </Button>
      </div>
    </div>
  )
}
