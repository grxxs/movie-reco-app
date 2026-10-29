"use server";

import { URLParamsSchema, AddTitleFormState } from "../definitions";
import { getCurrentUser } from "../database/get-current-user";
import { redirect } from "next/navigation";
import { fetchTitleDetails } from "../tmdb";
import { getTypeDB } from "../format/fromat-helper";
import { revalidatePath } from "next/cache";

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
  const details = await fetchTitleDetails({
    id: validatedFields.data.id,
    type: validatedFields.data.type,
  });

  if (!details) {
    return {
      message: "Nie znaleziono tytułu",
    };
  }

  const typeDB = getTypeDB(validatedFields.data.type);
  const date = details.releaseDate ? new Date(details.releaseDate) : null;

  //tu zapis

  revalidatePath(
    `/title/${validatedFields.data.type}/${validatedFields.data.id}`,
  );

  return { errors: {}, message: "dodano" };
}
