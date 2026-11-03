import { TitleDetails } from "../definitions";
import { prisma } from "@/app/lib/prisma";
import { WatchStatus, MediaType } from "@/generated/prisma/enums";

export async function addProductionToList({
  details,
  typeDB,
  dateDB,
  userId,
  rating,
  status,
}: {
  details: TitleDetails;
  typeDB: MediaType;
  dateDB: Date | null;
  userId: string;
  rating?: number | null;
  status?: WatchStatus;
}) {
  await prisma.$transaction(async (tx) => {
    const upsertProduction = await tx.production.upsert({
      where: {
        tmdbId_mediaType: {
          tmdbId: details.id,
          mediaType: typeDB,
        },
      },
      update: {
        title: details.title,
        overview: details.overview,
        releaseDate: dateDB,
        syncedAt: new Date(),
        posterPath: details.posterPath,
      },
      create: {
        tmdbId: details.id,
        mediaType: typeDB,
        title: details.title,
        releaseDate: dateDB,
        overview: details.overview,
        posterPath: details.posterPath,
      },
    });

    await tx.genre.createMany({
      data: details.genres,
      skipDuplicates: true,
    });

    await tx.keyword.createMany({
      data: details.keywords,
      skipDuplicates: true,
    });

    await tx.productionGenre.createMany({
      data: details.genres.map((genre) => ({
        productionId: upsertProduction.id,
        genreId: genre.id,
      })),
      skipDuplicates: true,
    });

    await tx.productionKeyword.createMany({
      data: details.keywords.map((keyword) => ({
        productionId: upsertProduction.id,
        keywordId: keyword.id,
      })),
      skipDuplicates: true,
    });

    await tx.listItem.create({
      data: {
        productionId: upsertProduction.id,
        userId: userId,
        rating: rating,
        status: status,
      },
    });
  });
}
