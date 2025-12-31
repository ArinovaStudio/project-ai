import { NextRequest, NextResponse } from 'next/server';
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function POST(req: NextRequest) {
    try {
        const session = await auth();

        if (!session?.user?.id || !session.user.email) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const { title, description, budget, timeline } = await req.json();

        const collaboration = await prisma.collaboration.create({
            data: {
                userId: session.user.id,
                userEmail: session.user.email,
                title,
                description,
                budget,
                timeline,
            },
        });

        return NextResponse.json(
            { collaboration },
            { status: 201 }
        );
    } catch (error) {
        // console.log("Error", error.message);
        return NextResponse.json(
            { error: "Failed to create collaboration" },
            { status: 500 }
        );
    }
}

export async function GET(req: NextRequest) {
    try {
        const collaborations = await prisma.collaboration.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });

        return NextResponse.json(
            { collaborations },
            { status: 200 }
        );
    } catch (error) {
        // console.log("Error", error.message);
        return NextResponse.json(
            { error: "Failed to fetch collaborations" },
            { status: 500 }
        );
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('colabId');

        if (!id) {
            return NextResponse.json(
                { error: "Collaboration ID is required" },
                { status: 400 }
            );
        }

        await prisma.collaboration.delete({
            where: { id },
        });

        return NextResponse.json(
            { message: "Collaboration deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        // console.log("Error", error.message);
        return NextResponse.json(
            { error: "Failed to delete collaboration" },
            { status: 500 }
        );
    }
}