"use client";
import { WatchStatus } from "@/generated/prisma/enums";
import { useActionState, useState, useRef } from "react";
import { ChangeStatusFormState, listStatusString } from "@/app/lib/definitions";
import { selectStatus } from "@/app/lib/actions/select-status";

export default function SelectStatus({
  id,
  titleStatus,
}: {
  id: string;
  titleStatus: WatchStatus;
}) {
  const [status, setStatus] = useState(titleStatus);
  const timerRef = useRef(0);

  const initialState: ChangeStatusFormState = { errors: {}, message: null };
  const [state, action] = useActionState(selectStatus, initialState);

  function handleChange(status: WatchStatus, form: HTMLFormElement | null) {
    setStatus(status);

    window.clearTimeout(timerRef.current);

    if (status === titleStatus) {
      return;
    }

    timerRef.current = window.setTimeout(() => {
      form?.requestSubmit();
    }, 400);
  }

  return (
    <form action={action}>
      <select
        name="status"
        className="w-full rounded-2xl border border-gray-300 px-2 py-0.5 text-xs font-semibold cursor-pointer"
        value={status}
        onChange={(e) =>
          handleChange(e.target.value as WatchStatus, e.currentTarget.form)
        }
      >
        <option value="PLANNED">{listStatusString.planned}</option>
        <option value="WATCHED">{listStatusString.watched}</option>
        <option value="WATCHING">{listStatusString.watching}</option>
      </select>
      <input type="hidden" name="id" value={id} />
      <p className="text-xs text-center mt-1 empty:hidden">{state.message}</p>
    </form>
  );
}
