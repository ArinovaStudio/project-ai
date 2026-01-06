"use client";

import { useEffect, useState } from "react";
import { User } from "@/lib/type/type";
import { CheckCircle, Mail, User as UserIcon } from "lucide-react";
import Image from "next/image";

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
    <div className="min-h-screen bg-background p-8 flex items-center justify-center">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Light mode blobs */}
        <div className="absolute top-20 left-60 w-72 h-72 bg-blue-500 rounded-full blur-3xl opacity-20 animate-pulse dark:hidden" />
        <div className="absolute bottom-20 right-40 w-96 h-96 bg-purple-400 rounded-full blur-3xl opacity-20 animate-pulse delay-1000 dark:hidden" />

        {/* Dark mode blobs */}
        <div className="absolute top-20 left-60 w-72 h-72 bg-cyan-400 rounded-full blur-3xl opacity-30 animate-pulse hidden dark:block mix-blend-screen" />
        <div className="absolute bottom-20 right-40 w-96 h-96 bg-fuchsia-500 rounded-full blur-3xl opacity-30 animate-pulse delay-1000 hidden dark:block mix-blend-screen" />
      </div>


      <div className="relative max-w-2xl w-full space-y-6">
        {/* Header Card */}
        <div className="backdrop-blur-xl bg-background/20 rounded-3xl p-8 border border-white/20 shadow-[inset_0_0_8px_rgba(0,0,0,0.3)] dark:shadow-[inset_0_0_12px_rgba(255,255,255,0.2)]">

          <div className="flex items-center space-x-6">
            {user?.image ? (
              <Image
                src={user.image}
                alt={user.name ?? "User avatar"}
                className="w-20 h-20 rounded-full object-cover shadow-lg"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-linear-to-br from-blue-400 to-blue-600 flex items-center justify-center text-foreground text-3xl font-bold shadow-lg">
                {user?.name?.charAt(0)?.toUpperCase()}
              </div>
            )}


            <div>
              <h1 className="text-3xl font-bold text-foreground mb-1">{user?.name}</h1>
              <p className="text-foreground">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Account Information Card */}
        <div className="backdrop-blur-xl bg-background/20 rounded-3xl p-8 border border-white/20 shadow-[inset_0_0_8px_rgba(0,0,0,0.3)] dark:shadow-[inset_0_0_12px_rgba(255,255,255,0.2)]">
          <h2 className="text-xl font-semibold text-foreground mb-6">Account Information</h2>

          <div className="space-y-4">
            {/* Name Field */}
            <div className="flex items-center justify-between px-4  rounded-xl ">
              <div className="flex items-center space-x-3">
                <UserIcon className="w-5 h-5 text-foreground/70" />
                <span className="text-foreground/70">Name</span>
              </div>
              <span className="text-foreground font-medium">{user.name}</span>
            </div>
            <hr className="mx-4 border-border" />
            {/* Email Field */}
            <div className="flex items-center justify-between px-4 rounded-xl">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-foreground/70" />
                <span className="text-foreground/70">Email</span>
              </div>
              <span className="text-foreground font-medium">{user.email}</span>
            </div>
          </div>
        </div>

        {/* Subscription Card */}
        <div className="backdrop-blur-xl bg-background/20 rounded-3xl p-8 border border-white/20 shadow-[inset_0_0_8px_rgba(0,0,0,0.3)] dark:shadow-[inset_0_0_12px_rgba(255,255,255,0.2)]">
          <h2 className="text-xl font-semibold text-foreground mb-6">Subscription</h2>

          <div className="flex items-center justify-between px-4 rounded-xl">
            <span className="text-foreground/70">Current Plan</span>
            <div
              className={`flex items-center space-x-2 px-4 py-2 rounded-full shadow-lg ${user.subscriptionTag === "FREE"
                ? "bg-[#CF5056]"
                : "bg-linear-to-r from-blue-500 to-cyan-500"
                }`}
            >
              {user.subscriptionTag !== "FREE" && <CheckCircle className="w-5 h-5 text-foreground" />}
              <span className="text-foreground font-bold">
                {user.subscriptionTag}
              </span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
