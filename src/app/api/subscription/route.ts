import { NextRequest, NextResponse } from 'next/server';
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(req: NextRequest) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const subscription = await prisma.subscription.findFirst({
            where: {
                userId: session.user.id,
                status: "ACTIVE",
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json(
            { subscription },
            { status: 200 }
        );

    } catch (error) {
        // console.error("Error fetching subscription plans:", error);

        return NextResponse.json(
            { error: "Failed to fetch subscription plans" },
            { status: 500 }
        );
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
        const { userId, planId, startDate, endDate } = body;

        if (!userId || !planId || !startDate || !endDate) {
            return NextResponse.json(
                { error: "userId, planId, startDate, and endDate are required" },
                { status: 400 }
            );
        }

        const subscription = await prisma.subscription.create({
            data: {
                userId, // 👈 comes from body
                planId,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
            },
        });

        return NextResponse.json(
            { subscription },
            { status: 201 }
        );

    } catch (error) {
        console.error("Error creating subscription:", error);

        return NextResponse.json(
            { error: "Failed to create subscription" },
            { status: 500 }
        );
    }
}


export async function DELETE(req: NextRequest) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const { searchParams } = new URL(req.url);
        const subscriptionId = searchParams.get("id");

        if (!subscriptionId) {
            return NextResponse.json(
                { error: "Missing subscription ID" },
                { status: 400 }
            );
        }

        const deleted = await prisma.subscription.deleteMany({
            where: {
                id: subscriptionId,
                userId: session.user.id, // ownership check
            },
        });

        if (deleted.count === 0) {
            return NextResponse.json(
                { error: "Subscription not found or not allowed" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Subscription deleted successfully" },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error deleting subscription:", error);

        return NextResponse.json(
            { error: "Failed to delete subscription" },
            { status: 500 }
        );
    }
}
