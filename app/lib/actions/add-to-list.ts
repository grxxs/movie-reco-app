"use server";

import { URLParamsSchema, AddTitleFormState } from "../definitions";
import { getCurrentUser } from "../database/get-current-user";
import { redirect } from "next/navigation";
import { fetchTitleDetails } from "../tmdb";
import { getTypeDB } from "../format/fromat-helper";
import { revalidatePath } from "next/cache";
import { isProductionOnList } from "../database/check-production";
import { addProductionToList } from "../database/add-production-to-list";
import { Prisma } from "@/generated/prisma/client";

export async function addTitleToList(
  state: AddTitleFormState,
  formData: FormData,
): Promise<AddTitleFormState> {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }
  const id = formData.get("id")?.toString() ?? "";
  const type = formData.get("type")?.toString() ?? "";
  const validatedFields = URLParamsSchema.safeParse({
    id: id,
    type: type,
  });
  if (!validatedFields.success) {
    return {
      message: "Nieprawidłowe dane",
    };
  }

  const typeDB = getTypeDB(validatedFields.data.type);
  if (await isProductionOnList(user.id, validatedFields.data.id, typeDB)) {
    return {
      message: "Tytuł został już dodany",
    };
  }

  const details = await fetchTitleDetails({
    id: validatedFields.data.id,
    type: validatedFields.data.type,
  });

  if (!details) {
    return {
      message: "Nie znaleziono tytułu",
    };
  }

  const dateDB = details.releaseDate ? new Date(details.releaseDate) : null;

  try {
    await addProductionToList({ details, typeDB, dateDB, userId: user.id });
  } catch (e) {
    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code === "P2002" &&
      e.meta?.modelName === "LisItem"
    ) {
      return { message: "Tytuł został już dodany" };
    }
    throw e;
  }
  revalidatePath(
    `/title/${validatedFields.data.type}/${validatedFields.data.id}`,
  );

  return { errors: {}, message: "Dodano do listy" };
}
