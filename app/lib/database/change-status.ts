import { prisma } from "@/app/lib/prisma";
import { WatchStatus } from "@/generated/prisma/enums";

export async function changeStatus(
  id: string,
  userId: string,
  status: WatchStatus,
): Promise<number> {
  const changeStatus = await prisma.listItem.updateMany({
    where: {
      userId: userId,
      id: id,
    },
    data: {
      status: status,
    },
  });

  return changeStatus.count;
}
