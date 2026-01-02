// /api/ai/route.ts
import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getAIResponse } from "@/lib/ai"
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
    try {
        const { message, historyId } = await req.json()

        if (!message || typeof message !== "string") {
            return NextResponse.json(
                { error: "Message is required" },
                { status: 400 }
            )
        }
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        // Assume userId comes from auth middleware
        const userId = session?.user?.id

        // 1️⃣ Resolve or create history
        const history =
            historyId
                ? await prisma.history.findUnique({ where: { id: historyId } })
                : await prisma.history.create({ data: { userId } })

        if (!history) {
            return NextResponse.json(
                { error: "Invalid history" },
                { status: 404 }
            )
        }

        // 2️⃣ Save PERSON message
        await prisma.message.create({
            data: {
                historyId: history.id,
                role: "PERSON",
                content: message,
            },
        })

        // 3️⃣ Call AI
        let aiResponse: string
        try {
            aiResponse = await getAIResponse(history.id)
        } catch (aiError) {
            // AI failed — user message is preserved
            await prisma.message.create({
                data: {
                    historyId: history.id,
                    role: "AI",
                    content: "Sorry, something went wrong. Please try again.",
                },
            })

            return NextResponse.json(
                {
                    historyId: history.id,
                    error: "AI service failed",
                },
                { status: 500 }
            )
        }

        // 4️⃣ Save AI message
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
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}
