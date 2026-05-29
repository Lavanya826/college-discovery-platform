import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { withAuth } from "@/middleware/withAuth";
import { prisma } from "@/lib/prisma";

type SavedCollegeContext = {
  params: Promise<{ collegeId: string }>;
};

export const POST = withAuth(async (_request: NextRequest, userId: string, context: SavedCollegeContext) => {
  const { collegeId } = await context.params;
  const college = await prisma.college.findUnique({ where: { id: collegeId } });

  if (!college) {
    return NextResponse.json({ message: "College not found" }, { status: 404 });
  }

  await prisma.savedCollege.upsert({
    where: { userId_collegeId: { userId, collegeId } },
    update: {},
    create: { userId, collegeId }
  });

  return NextResponse.json({ saved: true });
});

export const DELETE = withAuth(async (_request: NextRequest, userId: string, context: SavedCollegeContext) => {
  const { collegeId } = await context.params;

  await prisma.savedCollege.deleteMany({
    where: { userId, collegeId }
  });

  return NextResponse.json({ saved: false });
});
