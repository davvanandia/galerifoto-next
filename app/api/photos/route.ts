import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const title = formData.get("title") as string;
  const file = formData.get("file") as File | null;

  if (!title || !file) {
    return NextResponse.json({ error: "Data tidak lengkap" }, { status: 400 });
  }

  // cari user
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (!user) {
    return NextResponse.json({ error: "User tidak ditemukan" }, { status: 404 });
  }

  // simpan file
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const filename = `${Date.now()}-${file.name}`;
  const filepath = path.join(process.cwd(), "public", "uploads", filename);
  await writeFile(filepath, buffer);

  // simpan ke database
  await prisma.photo.create({
    data: {
      title,
      imageUrl: `/uploads/${filename}`, // relative path
      userId: user.id,
    },
  });

  return NextResponse.json({ success: true });
}
