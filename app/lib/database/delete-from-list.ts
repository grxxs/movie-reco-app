import { prisma } from "@/app/lib/prisma";

export async function deleteFromList(
  id: string,
  userId: string,
): Promise<number> {
  const deleted = await prisma.listItem.deleteMany({
    where: {
      userId: userId,
      id: id,
    },
  });

  return deleted.count;
}
