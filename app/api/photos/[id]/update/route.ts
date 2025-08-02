import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title } = await req.json();
  if (!title) {
    return NextResponse.json({ error: "Judul wajib diisi" }, { status: 400 });
  }

  // Pastikan foto milik user
  const photo = await prisma.photo.findUnique({
    where: { id: params.id },
    include: { user: true },
  });

  if (!photo || photo.user.email !== session.user.email) {
    return NextResponse.json({ error: "Tidak diizinkan" }, { status: 403 });
  }

  const updated = await prisma.photo.update({
    where: { id: params.id },
    data: { title },
  });

  return NextResponse.json({ success: true, photo: updated });
}
