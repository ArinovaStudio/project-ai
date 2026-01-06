import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getAIResponse } from "@/lib/ai"
import { auth } from "@/lib/auth"

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { message, historyId } = await req.json()
    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      )
    }

    const userId = session.user.id

    // 1️⃣ Resolve history
    let history = null

    if (historyId) {
      history = await prisma.history.findFirst({
        where: { id: historyId, userId },
      })
    }

    if (!history) {
      history = await prisma.history.create({
        data: { userId },
      })
    }

    // 2️⃣ Save PERSON message
    await prisma.message.create({
      data: {
        historyId: history.id,
        role: "PERSON",
        content: message,
      },
    })

    // 3️⃣ Call AI (safe)
    let aiResponse: string =
      "I'm sorry, but I'm currently unable to respond. Please try again later."

    try {
      aiResponse = await getAIResponse(message)
    } catch (err) {
      console.error("AI failure:", err)
      // fallback already assigned
    }

    // 4️⃣ Save AI message ONCE
    await prisma.message.create({
      data: {
        historyId: history.id,
        role: "AI",
        content: aiResponse,
      },
    })

    return NextResponse.json({
      historyId: history.id,
      message: aiResponse,
      success: true,
    })
  } catch (err) {
    console.error("Fatal error:", err)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
