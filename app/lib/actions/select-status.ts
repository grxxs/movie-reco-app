"use server";

import { ChangeStatusFormState, ChangeStatusFormSchema } from "../definitions";
import { getCurrentUser } from "../database/get-current-user";
import { redirect } from "next/navigation";
import { changeStatus } from "../database/change-status";
import { revalidatePath } from "next/cache";

export async function selectStatus(
  state: ChangeStatusFormState,
  formData: FormData,
): Promise<ChangeStatusFormState> {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const id = formData.get("id")?.toString();
  const status = formData.get("status")?.toString();

  const validatedFields = ChangeStatusFormSchema.safeParse({
    id: id,
    status: status,
  });
  if (!validatedFields.success) {
    return {
      message: "Nieprawidłowe dane",
    };
  }

  const statusChangeCount = await changeStatus(
    validatedFields.data.id,
    user.id,
    validatedFields.data.status,
  );

  if (statusChangeCount === 0) {
    return {
      message: "Nie znaleziono tytułu",
    };
  }

  revalidatePath("/list", "layout");

  return {
    errors: {},
    message: "Zmieniono status",
  };
}
