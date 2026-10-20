"use server";

import { createClient } from "../supabase/server";
import { LogInFormSchema, LogInFormState } from "../definitions";
import { redirect } from "next/navigation";

export async function login(
  state: LogInFormState,
  formData: FormData,
): Promise<LogInFormState> {
  const email = formData.get("email")?.toString() ?? "";
  const password = formData.get("password")?.toString() ?? "";
  const validatedFields = LogInFormSchema.safeParse({
    email: email,
    password: password,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      email: email,
    };
  }
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (!error) {
    redirect("/");
  } else if (error.code === "invalid_credentials") {
    return {
      message: "Nieprawidłowy email lub hasło",
      email: email,
    };
  } else {
    return {
      message: "Wystąpił nieoczekiwany błąd",
      email: email,
    };
  }
}
