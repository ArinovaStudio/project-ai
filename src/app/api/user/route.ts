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


// export async function PUT(req: Request) {
//   try {
//     const cookieStore = await cookies();
//     const token = cookieStore.get('token')?.value;

//     if (!token) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//     }

//     let payload;
//     try {
//       payload = verifyToken(token) as any;
//     } catch {
//       return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
//     }

//     const { name, phone, bio, department, workingAs, dob } = await req.json();

//     const updatedUser = await prisma.user.update({
//       where: { id: payload.userId || payload.id },
//       data: { name, phone, bio, department, workingAs, dob },
//       select: {
//         id: true,
//         name: true,
//         email: true,
//         role: true,
//         employeeId: true,
//         department: true,
//         phone: true,
//         bio: true,
//         image: true,
//         dob: true,
//         workingAs: true,
//         createdAt: true,
//         updatedAt: true,
//       },
//     });

//     return NextResponse.json({ user: updatedUser });
//   } catch (error) {
//     return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
//   }
// }