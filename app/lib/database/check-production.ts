import { prisma } from "@/app/lib/prisma";
import { MediaType } from "@/generated/prisma/enums";

export async function isProductionOnList(
  userId: string,
  tmdbId: number,
  type: MediaType,
): Promise<boolean> {
  const isOnList = await prisma.listItem.findFirst({
    select: {
      id: true,
    },
    where: {
      userId: userId,
      production: {
        mediaType: type,
        tmdbId: tmdbId,
      },
    },
  });
  if (isOnList) {
    return true;
  }
  return false;
}
