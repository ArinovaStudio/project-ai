"use client"

import { useEffect, useState } from "react"
import SubscriptionCard from "@/components/SubscriptionCard"
import { useRouter } from "next/navigation"
import GradientBg from "@/components/GradientBg"

// const plans = [
//   {
//     id: "starter",
//     name: "Starter",
//     price: 0,
//     period: "/month",
//     description: "Perfect for exploring and getting started.",
//     features: ["5 projects", "Basic analytics", "5GB storage", "Email support", "Community access"],
//     cta: "Start Free",
//     highlighted: false,
//   },
//   {
//     id: "professional",
//     name: "Professional",
//     price: 29,
//     period: "/month",
//     description: "For growing teams and advanced needs.",
//     features: [
//       "Unlimited projects",
//       "Advanced analytics",
//       "500GB storage",
//       "Priority support",
//       "API access",
//       "Team collaboration",
//     ],
//     cta: "Upgrade Now",
//     highlighted: true,
//   },
//   {
//     id: "enterprise",
//     name: "Enterprise",
//     price: null,
//     period: "Custom",
//     description: "For large-scale organizations.",
//     features: [
//       "Everything in Professional",
//       "Dedicated support",
//       "Custom integrations",
//       "SSO & SAML",
//       "Advanced security",
//       "SLA guarantee",
//     ],
//     cta: "Contact Sales",
//     highlighted: false,
//   },
// ]

interface PlanUI {
  id: string
  name: string
  price: number | null
  duration: string
  description: string
  features: string[]
  highlighted: boolean
  isSelected: boolean
  onSelect: () => void
}

export default function SubscriptionsPage() {
  const [selectedPlan, setSelectedPlan] = useState("professional")
  const router = useRouter()

  const [plans, setPlans] = useState<PlanUI[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await fetch("/api/subscriptionplan", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch plans");
        }
        
        const data = await res.json();
        console.log("\data = ",data.subscriptionPlans)
        setPlans(data.subscriptionPlans);
      } catch (err) {
        setError("Something went wrong");
        console.log(err)
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-muted-foreground">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-muted-foreground">
        {error ?? "Not authenticated"}
      </div>
    );
  }

  return (
    <main className="min-h-screen  text-foreground px-4 py-16 sm:px-6 lg:px-8">
      <GradientBg />
      {/* Header */}
      <div className="mx-auto max-w-4xl text-center mb-16">
        <div className="mb-4 inline-block rounded-full px-4 py-2 border backdrop-blur-md bg-white/30 dark:bg-black/10 border-white/20 dark:border-white/10 shadow-md">
          <span className="text-sm font-medium text-primary drop-shadow">
            New Pricing Model
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
          Simple, Transparent Pricing
        </h1>

        <p className="text-lg text-muted-foreground text-balance">
          Choose the perfect plan for your needs. Always flexible to scale as you grow.
        </p>
      </div>

      {/* Cards */}
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {plans.map((plan) => (
          <SubscriptionCard
            key={plan.id}
            {...plan}
            isSelected={selectedPlan === plan.id}
            onSelect={() => {
              setSelectedPlan(plan.id)
              router.push(`/checkout?plan=${plan.id}`)
            }}
          />
        ))}
      </div>
    </main>
  )
}
