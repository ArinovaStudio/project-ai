import { NextRequest, NextResponse } from 'next/server';
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const history = searchParams.get('history');

        if (!history) {
            return NextResponse.json({ error: "No Id found" }, { status: 401 });
        }

        const historyy = await prisma.history.findUnique({
            where: { id: history }
        });

        if (!historyy) {
            return NextResponse.json({ error: "History not found" }, { status: 404 });
        }

        return NextResponse.json({ historyy });

    } catch (error) {
        NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const body = await req.json();
        const { action, metadata } = body;

        if (!action) {
            return NextResponse.json(
                { error: "Action is required" },
                { status: 400 }
            );
        }

        const history = await prisma.history.create({
            data: {
                userId: session.user.id,
                action,
                metadata,
            },
        });

        return NextResponse.json(history, { status: 201 });

    } catch (error) {
        console.error("History POST error:", error);

        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}


export async function DELETE(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const history = searchParams.get('history');

        if (!history) {
            return NextResponse.json({ error: "No Id found" }, { status: 401 });
        }

        const deletedHistory = await prisma.history.delete({
            where: { id: history }
        });

        return NextResponse.json({ deletedHistory });

    } catch (error) {
        NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}