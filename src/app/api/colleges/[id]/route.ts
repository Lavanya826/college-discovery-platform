import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await getCurrentUser();
  const savedBy = { where: { userId: user?.id ?? "" } };
  const college = await prisma.college.findUnique({
    where: { id },
    include: {
      programs: true,
      savedBy
    }
  });

  if (!college) {
    return NextResponse.json({ message: "College not found" }, { status: 404 });
  }

  const { savedBy: collegeSavedBy, ...rest } = college;
  return NextResponse.json({ college: { ...rest, isSaved: collegeSavedBy.length > 0 } });
}
