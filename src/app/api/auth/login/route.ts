import { NextResponse } from "next/server";
import { authCookie, signToken } from "@/lib/auth";
import { verifyPassword } from "@/lib/hash";
import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/lib/validators";

export async function POST(request: Request) {
  const parsed = loginSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json({ message: parsed.error.errors[0]?.message ?? "Invalid input" }, { status: 400 });
  }

  const userWithPassword = await prisma.user.findUnique({ where: { email: parsed.data.email } });

  if (!userWithPassword || !(await verifyPassword(parsed.data.password, userWithPassword.passwordHash))) {
    return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
  }

  const user = {
    id: userWithPassword.id,
    name: userWithPassword.name,
    email: userWithPassword.email
  };

  const token = await signToken(user);
  const response = NextResponse.json({ user });
  response.cookies.set(authCookie(token));
  return response;
}
