import { NextRequest, NextResponse } from 'next/server';
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc", // latest users first
      },
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
      { users },
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

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('user');

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const deletedUser = await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    return NextResponse.json(
      {
        message: "User deleted successfully",
        userId: deletedUser.id,
        name: deletedUser.name,
      },
      { status: 200 }
    );

  } catch (error) {
    // console.error("Error deleting user:", error);

    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}
