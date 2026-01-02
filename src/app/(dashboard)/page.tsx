// app/page.tsx (server component)
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { ChatContainer } from "@/components/chat/ChatContainer";

export default async function Home() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return <ChatContainer />;
}
