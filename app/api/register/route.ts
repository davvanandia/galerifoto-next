import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  const { email, password, name } = await req.json();

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: "Email sudah terdaftar" }, { status: 400 });
  }

  const hashed = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: { email, password: hashed, name },
  });

  return NextResponse.json({ success: true });
}
