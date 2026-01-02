"use client";

import { createContext, useContext, ReactNode } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import type { User } from "next-auth";
import type { SignInResponse } from "next-auth/react";

type AuthContextType = {
  user: User | undefined;
  status: "loading" | "authenticated" | "unauthenticated";
  login: (email: string, password: string) => Promise<SignInResponse | undefined>;
  signup: (
    name: string,
    email: string,
    password: string
  ) => Promise<SignInResponse | undefined>;
  googleLogin: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();

  const login = async (email: string, password: string) => {
    return signIn("credentials", {
      email,
      password,
      action: "login",
      redirect: false,
    });
  };

  const signup = async (name: string, email: string, password: string) => {
    return signIn("credentials", {
      name,
      email,
      password,
      action: "signup",
      redirect: false,
    });
  };

  const googleLogin = () => {
    signIn("google", { callbackUrl: "/" });
  };

  const logout = () => {
    signOut({ callbackUrl: "/login" });
  };

  return (
    <AuthContext.Provider
      value={{
        user: session?.user,
        status,
        login,
        signup,
        googleLogin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
