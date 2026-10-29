"use client";

import { useActionState } from "react";
import { AddTitleFormState, MediaTypeEnum } from "@/app/lib/definitions";
import { addTitleToList } from "../lib/actions/add-to-list";
import Button from "@/app/components/button";

export default function AddToListForm({
  id,
  type,
}: {
  id: number;
  type: MediaTypeEnum;
}) {
  const initialState: AddTitleFormState = { message: null, errors: {} };
  const [state, action, pending] = useActionState(addTitleToList, initialState);
  return (
    <form action={action} className="w-1/4 min-w-[230px] mt-3">
      <input type="hidden" name="type" value={type} />
      <input type="hidden" name="id" value={id} />
      <Button
        disabled={pending}
        className="w-full text-center border-transparent "
      >
        {pending ? "Dodawanie..." : "Dodaj do listy"}
      </Button>
      <p>{state.message}</p>
    </form>
  );
}
