import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // pastikan foto milik user yang login
  const photo = await prisma.photo.findUnique({
    where: { id: params.id },
    include: { user: true },
  });

  if (!photo || photo.user.email !== session.user.email) {
    return NextResponse.json({ error: "Tidak diizinkan" }, { status: 403 });
  }

  await prisma.photo.delete({
    where: { id: params.id },
  });

  return NextResponse.json({ success: true });
}
