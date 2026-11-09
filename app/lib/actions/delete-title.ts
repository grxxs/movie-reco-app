"use server";

import { DeleteTitleFormSchema } from "../definitions";
import { getCurrentUser } from "../database/get-current-user";
import { redirect } from "next/navigation";
import { deleteFromList } from "../database/delete-from-list";
import { revalidatePath } from "next/cache";

export async function deleteTitle(formData: FormData): Promise<void> {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const id = formData.get("id")?.toString();

  const validatedFields = DeleteTitleFormSchema.safeParse({
    id: id,
  });
  if (!validatedFields.success) {
    return;
  }

  await deleteFromList(validatedFields.data.id, user.id);

  revalidatePath("/list", "layout");
}
