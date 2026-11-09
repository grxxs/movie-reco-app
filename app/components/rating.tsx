"use client";
import { useState, useActionState } from "react";
import { GoStarFill } from "react-icons/go";
import { MediaTypeEnum, AddRatingFormState } from "@/app/lib/definitions";
import { rateTitle } from "../lib/actions/rate-title";

const hovers = {
  hover: "text-yellow-500",
  nohover: "text-gray-500",
};

export default function Rating({
  id,
  type,
  rating,
}: {
  id: number;
  type: MediaTypeEnum;
  rating: number;
}) {
  const [selected, setSelected] = useState(rating);
  const [hovered, setHovered] = useState(0);
  const initialState: AddRatingFormState = { errors: {}, message: null };
  const [state, action, pending] = useActionState(rateTitle, initialState);

  function handleHover(n: number) {
    setHovered(n);
  }

  function handleClick(n: number) {
    setSelected(n);
    setHovered(0);
  }

  function handleMouseLeave() {
    setHovered(0);
  }

  return (
    <form action={action} className="flex flex-col items-center gap-2 mt-4">
      <div className="flex flex-row" onMouseLeave={() => handleMouseLeave()}>
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            type="button"
            className={`${(hovered || selected) >= n ? hovers.hover : hovers.nohover} cursor-pointer `}
            key={n}
            onMouseEnter={() => handleHover(n)}
            onClick={() => handleClick(n)}
            aria-label={`Oceń na ${n}`}
          >
            <GoStarFill className="text-3xl mx-1.5" />
          </button>
        ))}
      </div>
      <button
        type="submit"
        className="text-md w-full bg-yellow-500 rounded-2xl py-0.5 font-bold hover:bg-yellow-400 transition-colors duration-200 ease-in-out cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        disabled={selected === 0 || pending}
      >
        {pending ? "Zapisywanie..." : "Oceń"}
      </button>
      <p className="-mt-1">{state.message}</p>
      <input type="hidden" name="type" value={type} />
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="rating" value={selected} />
    </form>
  );
}
