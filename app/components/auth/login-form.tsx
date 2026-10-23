"use client";

import { login } from "@/app/lib/actions/login";
import { useActionState } from "react";
import { LogInFormState } from "@/app/lib/definitions";
import Button from "@/app/components/button";
import Link from "next/link";

export default function LoginForm() {
  const initialState: LogInFormState = { message: null, errors: {} };
  const [state, action, pending] = useActionState(login, initialState);
  return (
    <div className="p-2.5 flex justify-center items-center h-full">
      <form
        action={action}
        className="flex flex-col gap-2 w-96 py-8 px-4 rounded-2xl shadow-xl/20 items-center justify-center"
      >
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="email" className="text-sm">
            Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Email"
            className="border border-gray-300 py-1 px-2 rounded text-sm"
            defaultValue={state?.email}
            autoComplete="email"
          />
        </div>
        {state?.errors?.email && (
          <p className="text-xs text-red-500">{state.errors.email}</p>
        )}
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="password" className="text-sm">
            Hasło
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="border border-gray-300 py-1 px-2 rounded text-sm"
            placeholder="Hasło"
            autoComplete="current-password"
          />
        </div>
        {state?.errors?.password && (
          <p className="text-xs text-red-500">{state.errors.password}</p>
        )}
        {state?.message && (
          <p className="text-xs text-red-500">{state.message}</p>
        )}

        <Button type="submit" className="w-1/2" disabled={pending}>
          {pending ? "Logowanie..." : "Zaloguj"}
        </Button>
        <p className="text-xs">
          Nie masz konta?{" "}
          <Link href="/register" className="text-blue-500">
            Zarejestruj się
          </Link>
        </p>
      </form>
    </div>
  );
}
