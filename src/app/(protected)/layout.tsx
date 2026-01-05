import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import DashboardLayout from "./client-layout";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return <DashboardLayout>{children}</DashboardLayout>;
}
