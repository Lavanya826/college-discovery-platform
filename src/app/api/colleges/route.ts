import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { collegeQuerySchema } from "@/lib/validators";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const parsed = collegeQuerySchema.safeParse(Object.fromEntries(searchParams));

  if (!parsed.success) {
    return NextResponse.json({ message: "Invalid query parameters" }, { status: 400 });
  }

  const { q, type, page, pageSize } = parsed.data;
  const where: Prisma.CollegeWhereInput = {
    ...(type ? { type } : {}),
    ...(q
      ? {
          OR: [
            { name: { contains: q } },
            { city: { contains: q } },
            { state: { contains: q } }
          ]
        }
      : {})
  };

  const user = await getCurrentUser();
  const savedBy = { where: { userId: user?.id ?? "" } };
  const [total, colleges] = await Promise.all([
    prisma.college.count({ where }),
    prisma.college.findMany({
      where,
      include: {
        programs: true,
        savedBy
      },
      orderBy: [{ ranking: "asc" }, { name: "asc" }],
      skip: (page - 1) * pageSize,
      take: pageSize
    })
  ]);

  return NextResponse.json({
    colleges: colleges.map(({ savedBy: collegeSavedBy, ...college }) => ({
      ...college,
      isSaved: collegeSavedBy.length > 0
    })),
    total,
    page,
    pageSize
  });
}
