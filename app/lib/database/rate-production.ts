import { prisma } from "@/app/lib/prisma";
import { MediaType } from "@/generated/prisma/enums";

export async function addProductionRating(
  userId: string,
  tmdbId: number,
  type: MediaType,
  rating: number,
): Promise<number> {
  const updateRating = await prisma.listItem.updateMany({
    where: {
      userId: userId,
      production: {
        tmdbId: tmdbId,
        mediaType: type,
      },
    },
    data: {
      rating: rating,
      status: "WATCHED",
    },
  });

  return updateRating.count;
}
