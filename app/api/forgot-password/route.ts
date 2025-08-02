import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { email } = await req.json();
  console.log("DEBUG email dari request:", email);

  const user = await prisma.user.findUnique({ where: { email } });
  console.log("DEBUG hasil query:", user);

  if (!user) {
    return NextResponse.json(
      { error: "Email tidak ditemukan" },
      { status: 404 }
    );
  }

  console.log(`Kirim email reset ke ${email}`);
  return NextResponse.json({ message: "Reset password email sent" });
}
