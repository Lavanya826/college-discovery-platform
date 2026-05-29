import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authCookie, signToken } from "@/lib/auth";
import { hashPassword } from "@/lib/hash";
import { signupSchema } from "@/lib/validators";

export async function POST(request: Request) {
  const parsed = signupSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json({ message: parsed.error.errors[0]?.message ?? "Invalid input" }, { status: 400 });
  }

  const existing = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  if (existing) {
    return NextResponse.json({ message: "Email is already registered" }, { status: 409 });
  }

  const user = await prisma.user.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      passwordHash: await hashPassword(parsed.data.password)
    },
    select: { id: true, name: true, email: true }
  });

  const token = await signToken(user);
  const response = NextResponse.json({ user }, { status: 201 });
  response.cookies.set(authCookie(token));
  return response;
}
