"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { User } from "@/lib/type/type";

export default function MyAccountPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/user/edit", {
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Unauthorized or failed to fetch user");
        }

        const data = await res.json();

        if (!data?.user) {
          throw new Error("User not found");
        }

        setUser(data.user);
      } catch (err) {
        console.error("Fetch user error:", err);
        setError("Unable to load your profile. Please log in again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  /* ---------------- Loading ---------------- */
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-75 text-muted-foreground">
        Loading your profile…
      </div>
    );
  }

  /* ---------------- Error / No User ---------------- */
  if (error || !user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-75 gap-4">
        <p className="text-muted-foreground text-sm">
          {error ?? "You are not logged in."}
        </p>
      </div>
    );
  }

  /* ---------------- Main UI ---------------- */
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {/* Header */}
      <Card>
        <CardContent className="flex items-center gap-4 p-6">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user.image ?? ""} />
            <AvatarFallback className="text-xl">
              {user.name?.trim()?.charAt(0)?.toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <h2 className="text-lg font-semibold">
              {user.name ?? "Unnamed User"}
            </h2>
            <p className="text-sm text-muted-foreground">
              {user.email}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Account Info */}
      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <InfoRow label="Name" value={user.name ?? "-"} />
          <InfoRow label="Email" value={user.email} />
        </CardContent>
      </Card>

      {/* Subscription */}
      <Card>
        <CardHeader>
          <CardTitle>Subscription</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Current Plan
            </span>
            <Badge
              variant={user.subscriptionTag === "FREE" ? "outline" : "default"}
            >
              {user.subscriptionTag}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/* ---------------- Helper ---------------- */

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <>
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium">{value}</span>
      </div>
      <Separator />
    </>
  );
}
