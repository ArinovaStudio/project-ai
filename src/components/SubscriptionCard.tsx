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
          ? "border-primary/40 bg-primary/5 shadow-lg ring-1 ring-primary/30 md:scale-105"
          : "border-border bg-card hover:border-primary/30 shadow-sm",
      )}
    >
      {/* Recommended Badge */}
      {highlighted && (
        <div className="absolute top-4 right-4 inline-block rounded-full bg-blue-600 dark:bg-primary px-3 py-1">
          <span className="text-xs font-semibold text-primary-foreground">
            Recommended
          </span>
        </div>
      )}

      {/* Card Content */}
      <div className="p-8 flex flex-col h-full">
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
                <span className="text-muted-foreground">
                  {period}
                </span>
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
              <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span className="text-sm text-muted-foreground">
                {feature}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Button
          onClick={onSelect}
          className={cn(
            "w-full h-11 font-semibold transition-all duration-300 cursor-pointer",
            highlighted
              ? "bg-blue-600 dark:bg-primary text-primary-foreground hover:bg-blue-700"
              : "bg-muted text-foreground hover:bg-muted/80",
          )}
        >
          {cta}
        </Button>
      </div>
    </div>
  )
}
