import { NextRequest, NextResponse } from 'next/server';
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('collabId');

        if (!id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const Collaboration = await prisma.collaboration.findUnique({
            where: { id: id },
        });

        return NextResponse.json(
            { Collaboration },
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

export async function PUT(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('collabId');

        if (!id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { title, description, budget, timeline } = body;

        const updatedCollaboration = await prisma.collaboration.update({
            where: { id: id },
            data: {
                title,
                description,
                budget,
                timeline,
            },
        });

        return NextResponse.json(
            { updatedCollaboration },
            { status: 200 }
        );
    } catch (error) {
        NextResponse.json(
            { error: "Failed to update collaboration" },
            { status: 500 }
        );
    }
}