import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const name = formData.get("name") as string;
  const file = formData.get("image") as File | null;

  let imageUrl: string | undefined = undefined;
  if (file && file.size > 0) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filename = `${Date.now()}-${file.name}`;
    const filePath = path.join(process.cwd(), "public/uploads", filename);
    await writeFile(filePath, buffer);
    imageUrl = `/uploads/${filename}`;
  }

  const updated = await prisma.user.update({
    where: { email: session.user.email },
    data: {
      name,
      ...(imageUrl && { image: imageUrl }),
    },
  });

  return NextResponse.json(updated);
}
