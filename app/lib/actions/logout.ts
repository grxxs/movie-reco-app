"use server";

import { createClient } from "../supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function logout() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut({ scope: "local" });

  if (!error) {
    redirect("/login");
  } else {
    console.error(error.message);
    revalidatePath("/", "layout");
    redirect("/");
  }
}
