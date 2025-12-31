import { NextRequest, NextResponse } from 'next/server';
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('user');

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                email: true,
                image: true,
                role: true,
                subscriptionTag: true,
                createdAt: true,
            },
        });

        return NextResponse.json(
            { user },
            { status: 200 }
        );

    } catch (error) {
        // console.error("Error fetching users:", error);

        return NextResponse.json(
            { error: "Failed to fetch users" },
            { status: 500 }
        );
    }
}