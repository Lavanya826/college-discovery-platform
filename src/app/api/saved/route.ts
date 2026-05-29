import { NextResponse } from "next/server";
import { withAuth } from "@/middleware/withAuth";
import { prisma } from "@/lib/prisma";

export const GET = withAuth(async (_request, userId) => {
  const saved = await prisma.savedCollege.findMany({
    where: { userId },
    include: {
      college: {
        include: { programs: true }
      }
    },
    orderBy: { createdAt: "desc" }
  });

  return NextResponse.json({
    colleges: saved.map((item) => ({ ...item.college, isSaved: true }))
  });
});
