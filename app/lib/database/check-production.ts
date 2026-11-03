import { prisma } from "@/app/lib/prisma";
import { MediaType } from "@/generated/prisma/enums";
import { WatchStatus } from "@/generated/prisma/enums";

export async function getListItem(
  userId: string,
  tmdbId: number,
  type: MediaType,
): Promise<{ status: WatchStatus; rating: number | null } | null> {
  const isOnList = await prisma.listItem.findFirst({
    select: {
      status: true,
      rating: true,
    },
    where: {
      userId: userId,
      production: {
        mediaType: type,
        tmdbId: tmdbId,
      },
    },
  });
  if (isOnList !== null) {
    return isOnList;
  }
  return null;
}
