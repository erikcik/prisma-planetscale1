import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  console.log(body);
  const { sessionUserId, userId } = body;

  try {
    const user = await prisma.user.update({
      where: {
        id: sessionUserId,
      },
      data: {
        friends: {
          connect: { id: userId }, //connecting friend to the user
        },
      },
    });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
