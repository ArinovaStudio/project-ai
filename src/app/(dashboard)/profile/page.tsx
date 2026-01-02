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

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("/api/user/edit", {
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      }

      setLoading(false);
    };

    fetchUser();
  }, []);

  if (loading) {
    return null; // or skeleton
  }

  if (!user) {
    return null;
  }

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
            <h2 className="text-lg font-semibold">{user.name ?? "Unnamed User"}</h2>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>

          {/* <Badge variant="secondary">{user.role}</Badge> */}
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
          {/* <InfoRow label="Role" value={user.role} /> */}
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
            <Badge variant={user.subscriptionTag === "FREE" ? "outline" : "default"}>
              {user.subscriptionTag}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

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
