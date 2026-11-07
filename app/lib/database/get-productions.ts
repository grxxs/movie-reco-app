import { prisma } from "@/app/lib/prisma";
import { UserList } from "../definitions";

export async function getUserList(userId: string): Promise<UserList> {
  const userList = await prisma.listItem.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      status: true,
      rating: true,
      production: {
        select: {
          tmdbId: true,
          mediaType: true,
          title: true,
          posterPath: true,
          releaseDate: true,
        },
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return userList;
}
