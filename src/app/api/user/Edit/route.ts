import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
console.log("session", session.user.id);
console.log("session Details", session);


  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      histories: {
        orderBy: { createdAt: "desc" },
        take: 10,
      },
      subscription: true,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ user });
}

export async function PUT(req: Request) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('user');

    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name , role} = await req.json();

    try {
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { name, role },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                subscription: true,
                subscriptionTag: true,
            },
        });

        return NextResponse.json({ user: updatedUser });
    } catch (error) {
        // console.error("Error updating user:", error);
        return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
    }
}

export async function DELETE() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const deletedUser = await prisma.user.delete({
      where: {
        id: session.user.id,
      },
    });

    return NextResponse.json(
      {
        message: "User deleted successfully",
        userId: deletedUser.id,
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