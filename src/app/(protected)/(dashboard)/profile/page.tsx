"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { CheckCircle, Pencil, Shield, UserRoundPen } from "lucide-react";
import { User } from "@/lib/type/type";

import { GlassCard } from "@/components/ui/GlassCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { InfoRow } from "@/components/ui/InfoRow";

import { EditPersonalModal } from "@/components/EditPersonalModal";
import { EditAddressModal } from "@/components/EditAddressModal";

export default function AccountDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [editPersonalOpen, setEditPersonalOpen] = useState(false);
  const [editAddressOpen, setEditAddressOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/user/edit", { credentials: "include" });
        if (!res.ok) throw new Error("Unauthorized");

        const data = await res.json();
        if (!data?.user) throw new Error("User not found");

        console.log(data.user);

        setUser(data.user);
      } catch {
        setError("Unable to load account data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-muted-foreground">
        Loading dashboard…
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen text-muted-foreground">
        {error ?? "Not authenticated"}
      </div>
    );
  }

  const address = user.AddressInfo?.[0] ?? null;
//   console.log("\ndata = ",address)
  const subscription = user.subscription?.[0] ?? null;
  const plan = subscription?.plan ?? null;

  return (
    <div className="min-h-screen bg-background p-8">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-24 left-40 w-72 h-72 bg-cyan-400/30 rounded-full blur-3xl" />
        <div className="absolute bottom-24 right-40 w-96 h-96 bg-fuchsia-500/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto space-y-8">
        <header>
          <h1 className="text-3xl font-bold">Account Dashboard</h1>
          <p className="text-muted-foreground text-sm">
            Manage your profile, subscription, and system information
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT */}
          <div className="space-y-6">
            <GlassCard>
              <div className="flex items-center gap-4">
                {user.image ? (
                  <Image
                    src={user.image}
                    alt="Avatar"
                    width={80}
                    height={80}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-linear-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl font-bold">
                    {user.name?.charAt(0)?.toUpperCase()}
                  </div>
                )}

                <div>
                  <h2 className="text-xl font-semibold">{user.name}</h2>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                  <div className="flex items-center gap-2 mt-1 text-xs uppercase text-muted-foreground">
                    <Shield className="w-3 h-3" />
                    {user.role}
                  </div>
                </div>
              </div>
            </GlassCard>

            <GlassCard>
              <h3 className="font-semibold mb-4">Subscription</h3>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Current Plan
                </span>
                <div
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${user.subscriptionTag === "FREE"
                    ? "bg-red-500/20 text-red-400"
                    : "bg-linear-to-r from-blue-500 to-cyan-500 text-white"
                    }`}
                >
                  {user.subscriptionTag !== "FREE" && (
                    <CheckCircle className="w-4 h-4" />
                  )}
                  {user.subscriptionTag}
                </div>
              </div>
            </GlassCard>
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-2 space-y-6">
            <GlassCard>
              <SectionTitle
                title="Personal Information"
                onEdit={() => setEditPersonalOpen(true)}
                EditIcon={UserRoundPen}
              />
              <InfoRow label="Full Name" value={user.name} />
              <InfoRow label="Email Address" value={user.email} />
              <InfoRow label="Phone Number" value={user.phoneNumber} />
              <InfoRow
                label="Date of Birth"
                value={
                  user.dateOfBirth
                    ? new Date(user.dateOfBirth).toLocaleDateString()
                    : null
                }
              />
            </GlassCard>

            <GlassCard>
              <SectionTitle
                title="Address Information"
                onEdit={() => setEditAddressOpen(true)}
                EditIcon={Pencil}
              />
              {!address ? (
                <p className="text-sm text-muted-foreground">
                  No address information added yet.
                </p>
              ) : (
                <>
                  <InfoRow label="Address Line 1" value={address.Address1}/>
                  <InfoRow label="Address Line 2" value={address.Address2}/>
                  <InfoRow label="City" value={address.city} />
                  <InfoRow label="State" value={address.state} />
                  <InfoRow label="Country" value={address.country} />
                  <InfoRow label="Postal Code" value={address.zipCode} />
                </>
              )}
            </GlassCard>

            {/* System Metadata */}
            <GlassCard>
              <SectionTitle title="Account Metadata" />
              <InfoRow label="User ID" value={user.id} mono />
              <InfoRow
                label="Account Created"
                value={new Date(user.createdAt).toLocaleString()}
              />
              <InfoRow
                label="Last Updated"
                value={new Date(user.updatedAt).toLocaleString()}
              />
            </GlassCard>

          </div>
        </div>

        {/* Features */}
        <GlassCard>
          <SectionTitle title="Your Subscription Plan" />

          {!subscription || !plan ? (
            <p className="text-sm text-muted-foreground">
              You are currently on the Free plan.
            </p>
          ) : (
            <div className="space-y-4">
              {/* Plan header */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Valid for {plan.duration} days
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-xl font-bold">₹{plan.price}</p>
                  <p className="text-xs text-muted-foreground">per plan</p>
                </div>
              </div>

              {/* Features */}
              <div className="border-t pt-4">
                <p className="text-sm font-medium mb-2">
                  What’s included
                </p>

                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-sm"
                    >
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Status */}
              <div className="pt-2 text-xs text-muted-foreground">
                Status: {subscription.status}
              </div>
            </div>
          )}
        </GlassCard>

      </div>

      <EditPersonalModal
        open={editPersonalOpen}
        onClose={() => setEditPersonalOpen(false)}
        user={user}
      />

      <EditAddressModal
        open={editAddressOpen}
        onClose={() => setEditAddressOpen(false)}
        address={address}
      />
    </div>
  );
}