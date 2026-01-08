import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

interface UserSession {
  user: {
    id?: string;
    email?: string;
    name?: string;
    phoneNumber?: string;
    dateOfBirth?: string;
  };
}

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      histories: {
        orderBy: { createdAt: "desc" },
        take: 10,
      },
      subscription: {
        include: { plan: true },
      },
      AddressInfo: true,
    },
  });

  if (!user) {
    console.log("not found");

    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ user });
}


export async function PUT(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("user");

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { name, phoneNumber, dateOfBirth } = body;

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        phoneNumber,
        dateOfBirth: dateOfBirth
          ? new Date(dateOfBirth) // ✅ REQUIRED FIX
          : null,
      },
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
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
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