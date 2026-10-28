"use client";

import { MdError } from "react-icons/md";
import LinkButton from "@/app/components/linkbutton";

export default function Error() {
  return (
    <div className="w-full mx-auto flex gap-4 flex-1 flex-col items-center justify-center -mt-30">
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-row align-center items-center gap-2 font-bold text-4xl">
          <p className="">ERROR</p>
          <MdError />
        </div>
        <p className="font-medium text-4xl">Nastąpił nieoczekiwany błąd</p>
      </div>
      <LinkButton
        href="/"
        className="border-transparent bg-blue-500 hover:bg-blue-700 text-white"
      >
        Wróć do wyszukiwania
      </LinkButton>
    </div>
  );
}
