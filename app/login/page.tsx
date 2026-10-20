"use client";

import { login } from "../lib/actions/login";
import { useActionState } from "react";

export default function Login() {
  const [state, action, pending] = useActionState(login, undefined);
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
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm w-1/2"
        >
          {pending ? "Logowane..." : "Zaloguj"}
        </button>
      </form>
    </div>
  );
}
