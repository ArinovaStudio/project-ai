import { NextRequest, NextResponse } from 'next/server';
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function DELETE(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const result = await prisma.history.deleteMany({
      where: {
        userId: session.user.id,
      },
    });

    return NextResponse.json(
      {
        message: "All history deleted successfully",
        deletedCount: result.count,
      },
      { status: 200 }
    );

  } catch (error) {
    // console.error("Delete history error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
