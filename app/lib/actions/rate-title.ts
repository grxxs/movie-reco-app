"use server";

import { AddRatingFormState, AddRatingFormSchema } from "../definitions";
import { getCurrentUser } from "../database/get-current-user";
import { redirect } from "next/navigation";
import { addProductionRating } from "../database/rate-production";
import { getTypeDB } from "../format/fromat-helper";
import { revalidatePath } from "next/cache";
import { fetchTitleDetails } from "../tmdb";
import { addProductionToList } from "../database/add-production-to-list";
import { Prisma } from "@/generated/prisma/client";

export async function rateTitle(
  state: AddRatingFormState,
  formData: FormData,
): Promise<AddRatingFormState> {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const id = formData.get("id")?.toString();
  const type = formData.get("type")?.toString();
  const rating = formData.get("rating")?.toString();

  const validatedFields = AddRatingFormSchema.safeParse({
    id: id,
    type: type,
    rating: rating,
  });
  if (!validatedFields.success) {
    return {
      message: "Nieprawidłowe dane",
    };
  }

  const typeDB = getTypeDB(validatedFields.data.type);

  const updatedCount = await addProductionRating(
    user.id,
    validatedFields.data.id,
    typeDB,
    validatedFields.data.rating,
  );

  if (updatedCount === 0) {
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
      await addProductionToList({
        details: details,
        typeDB: typeDB,
        dateDB: dateDB,
        userId: user.id,
        rating: validatedFields.data.rating,
        status: "WATCHED",
      });
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === "P2002" &&
        e.meta?.modelName === "ListItem"
      ) {
        return { message: "Błąd podczas dodawania oceny, spróbuj ponownie" };
      }
      throw e;
    }
  }
  revalidatePath(
    `/title/${validatedFields.data.type}/${validatedFields.data.id}`,
  );
  revalidatePath("/list", "layout");

  return {
    errors: {},
    message: "Zapisano ocenę",
  };
}
