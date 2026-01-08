import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    // Get full URL
    const url = new URL(req.url);

    // Extract last path segment as id
    const id = url.pathname.split("/").pop();

    if (!id) {
      return NextResponse.json(
        { error: "id is missing" },
        { status: 400 }
      );
    }

    // Fetch plan
    const subscriptionPlan = await prisma.subscriptionPlan.findUnique({
      where: { id },
    });

    if (!subscriptionPlan) {
      return NextResponse.json(
        { error: "Plan not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ subscriptionPlan }, { status: 200 });
  } catch (error) {
    console.error("GET subscription plan error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
