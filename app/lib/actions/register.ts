"use server";

import { createClient } from "../supabase/server";
import { RegisterFormSchema, RegisterFormState } from "../definitions";
import { redirect } from "next/navigation";
import { prisma } from "@/app/lib/prisma";

export async function register(
  state: RegisterFormState,
  formData: FormData,
): Promise<RegisterFormState> {
  const email = formData.get("email")?.toString() ?? "";
  const username = formData.get("username")?.toString() ?? "";
  const password = formData.get("password")?.toString() ?? "";
  const validatedFields = RegisterFormSchema.safeParse({
    email: email,
    username: username,
    password: password,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      email: email,
      username: username,
    };
  }

  const existing = await prisma.user.findUnique({
    where: { username: validatedFields.data.username },
  });

  if (existing) {
    return {
      errors: { username: ["Podana nazwa użytkownika jest już zajęta"] },
      email: email,
      username: username,
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email: validatedFields.data.email,
    password: validatedFields.data.password,
    options: {
      data: { username: validatedFields.data.username },
    },
  });

  if (!error) {
    redirect("/");
  } else if (error.code === "user_already_exists") {
    return {
      errors: { email: ["Podany adres email jest już w użyciu"] },
      email: email,
      username: username,
    };
  } else {
    return {
      message: "Wystąpił nieoczekiwany błąd",
      email: email,
      username: username,
    };
  }
}
