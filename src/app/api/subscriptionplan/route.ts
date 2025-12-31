import { NextRequest, NextResponse } from 'next/server';
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
    try {
        const subscriptionPlans = await prisma.subscriptionPlan.findMany({
            orderBy: {
                price: 'asc',
            },
        });

        return NextResponse.json(
            { subscriptionPlans },
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
    const body = await req.json();
    const { name, price, features, duration } = body;

    if (!name || price == null || !Array.isArray(features) || duration == null) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const subscriptionPlan = await prisma.subscriptionPlan.create({
      data: {
        name,
        price: Number(price),
        features,
        duration: Number(duration),
      },
    });

    return NextResponse.json(
      { subscriptionPlan },
      { status: 201 }
    );

  } catch (error) {
    console.error("Error creating subscription plan:", error);

    return NextResponse.json(
      { error: "Failed to create subscription plan" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const planId = searchParams.get('id');

    if (!planId) {
      return NextResponse.json(
        { error: "Missing subscription plan ID" },
        { status: 400 }
      );
    }

    await prisma.subscriptionPlan.delete({
      where: { id: planId },
    });

    return NextResponse.json(
      { message: "Subscription plan deleted successfully" },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error deleting subscription plan:", error);

    return NextResponse.json(
      { error: "Failed to delete subscription plan" },
      { status: 500 }
    );
  }
}
