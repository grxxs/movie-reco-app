import { prisma } from "@/app/lib/prisma";
import { Prisma } from "@/generated/prisma/client";
import { createClient } from "@/app/lib/supabase/server";
import type { User } from "@/generated/prisma/client";

export async function getCurrentUser(): Promise<User | null> {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();

  let user: User;

  const auth = {
    id: data?.claims.sub,
    username: data?.claims.user_metadata?.username,
  };

  if (!auth.id || typeof auth.username !== "string") {
    return null;
  }

  try {
    const createUser = await prisma.user.upsert({
      where: {
        id: auth.id,
      },
      update: {},
      create: {
        id: auth.id,
        username: auth.username,
      },
    });
    user = createUser;
    return user;
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        const result = await prisma.user.findUnique({
          where: {
            id: auth.id,
          },
        });

        if (!result) {
          console.error(e);
          return null;
        } else {
          user = result;
          return user;
        }
      } else {
        console.error(e);
        return null;
      }
    } else {
      console.error(e);
      return null;
    }
  }
}
