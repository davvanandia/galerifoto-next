import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // Hapus semua data lama dulu biar bersih
  await prisma.photo.deleteMany();
  await prisma.user.deleteMany();

  // Buat 3 user
  const users = await Promise.all([
    prisma.user.create({
      data: {
        name: "Demo User",
        email: "demo@example.com",
        password: await bcrypt.hash("dummy", 10),
      },
    }),
    prisma.user.create({
      data: {
        name: "Rani Putri",
        email: "rani@example.com",
        password: await bcrypt.hash("password123", 10),
      },
    }),
    prisma.user.create({
      data: {
        name: "Budi Santoso",
        email: "budi@example.com",
        password: await bcrypt.hash("password123", 10),
      },
    }),
  ]);

  // Daftar foto untuk tiap user
  const photoData = [
    {
      title: "Gunung Indah",
      imageUrl: "https://source.unsplash.com/random/400x600?nature,mountain",
      userId: users[0].id,
    },
    {
      title: "Pantai Tropis",
      imageUrl: "https://source.unsplash.com/random/400x600?beach",
      userId: users[0].id,
    },
    {
      title: "Kota Malam",
      imageUrl: "https://source.unsplash.com/random/400x600?city,night",
      userId: users[0].id,
    },
    {
      title: "Hutan Rimba",
      imageUrl: "https://source.unsplash.com/random/400x600?forest",
      userId: users[1].id,
    },
    {
      title: "Air Terjun",
      imageUrl: "https://source.unsplash.com/random/400x600?waterfall",
      userId: users[1].id,
    },
    {
      title: "Langit Senja",
      imageUrl: "https://source.unsplash.com/random/400x600?sunset",
      userId: users[1].id,
    },
    {
      title: "Gedung Tinggi",
      imageUrl: "https://source.unsplash.com/random/400x600?skyscraper",
      userId: users[2].id,
    },
    {
      title: "Jalan Kota",
      imageUrl: "https://source.unsplash.com/random/400x600?street",
      userId: users[2].id,
    },
    {
      title: "Danau Tenang",
      imageUrl: "https://source.unsplash.com/random/400x600?lake",
      userId: users[2].id,
    },
  ];

  // Insert semua foto
  await prisma.photo.createMany({ data: photoData });

  console.log("Dummy data berhasil diinsert!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
