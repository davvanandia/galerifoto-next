import { prisma } from "@/lib/prisma";

export default async function HomePage() {
  const photos = await prisma.photo.findMany({
    orderBy: { createdAt: "desc" },
    include: { user: true },
  });

return (
  <div className="bg-gradient-to-b from-black via-gray-950 to-gray-900 min-h-screen pt-20">
    <div className="columns-1 sm:columns-2 lg:columns-4 gap-6 p-6">
      {photos.length === 0 && (
        <p className="text-gray-400 text-center col-span-full">
          Belum ada foto.
        </p>
      )}
      {photos.map((photo) => (
        <div
          key={photo.id}
          className="mb-6 break-inside-avoid rounded-xl overflow-hidden shadow-lg bg-gray-900 hover:shadow-purple-500/40 transition hover:scale-[1.02]"
        >
          <img
            src={photo.imageUrl}
            alt={photo.title}
            className="w-full object-cover max-h-[500px]"
          />
          <div className="p-4">
            <p className="text-lg font-semibold text-purple-300">
              {photo.title}
            </p>
            <span className="text-xs text-gray-400">
              by {photo.user.name || photo.user.email}
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

}
