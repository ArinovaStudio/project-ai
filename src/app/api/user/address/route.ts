import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const address = await prisma.addressInfo.findFirst({
    where: { userId: session.user.id },
  });

  return NextResponse.json({ address });
}


export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { street, city, state, zipCode, country } = await req.json();

  // Prevent duplicate address
  const existing = await prisma.addressInfo.findFirst({
    where: { userId: session.user.id },
  });

  if (existing) {
    return NextResponse.json(
      { error: "Address already exists" },
      { status: 400 }
    );
  }

  const address = await prisma.addressInfo.create({
    data: {
      userId: session.user.id,
      street,
      city,
      state,
      zipCode,
      country,
    },
  });

  return NextResponse.json({ address }, { status: 201 });
}


export async function PUT(req: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { street, city, state, zipCode, country } = await req.json();

  const address = await prisma.addressInfo.findFirst({
    where: { userId: session.user.id },
  });

  if (!address) {
    return NextResponse.json(
      { error: "Address not found" },
      { status: 404 }
    );
  }

  const updated = await prisma.addressInfo.update({
    where: { id: address.id },
    data: {
      street,
      city,
      state,
      zipCode,
      country,
    },
  });

  return NextResponse.json({ address: updated });
}


export async function DELETE() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const address = await prisma.addressInfo.findFirst({
    where: { userId: session.user.id },
  });

  if (!address) {
    return NextResponse.json(
      { error: "Address not found" },
      { status: 404 }
    );
  }

  await prisma.addressInfo.delete({
    where: { id: address.id },
  });

  return NextResponse.json({ success: true });
}
