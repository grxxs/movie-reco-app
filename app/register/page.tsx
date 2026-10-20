"use client";

import { register } from "../lib/actions/register";
import { useActionState } from "react";

export default function Register() {
  const [state, action, pending] = useActionState(register, undefined);
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
          {state?.errors?.email && (
            <p className="text-xs text-red-500 self-start">
              {state.errors.email}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="username" className="text-sm">
            Nazwa użytkownika
          </label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Nazwa użytkownika"
            className="border border-gray-300 py-1 px-2 rounded text-sm"
            defaultValue={state?.username}
            autoComplete="username"
          />
          {state?.errors?.username && (
            <p className="text-xs text-red-500 self-start">
              {state.errors.username}
            </p>
          )}
        </div>

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
            autoComplete="new-password"
          />
          <ul className="list-disc self-start px-2.5">
            {state?.errors?.password &&
              state?.errors?.password.map((error) => (
                <li className="text-xs text-red-500" key={error}>
                  {error}
                </li>
              ))}
          </ul>
          {state?.message && (
            <p className="text-xs text-red-500 self-start">{state.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm w-1/2"
        >
          {pending ? "Rejestracja..." : "Zarejestruj"}
        </button>
      </form>
    </div>
  );
}
