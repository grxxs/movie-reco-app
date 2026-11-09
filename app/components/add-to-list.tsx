import LinkButton from "./linkbutton";
import AddToListForm from "./add-to-list-form";
import { TitleDetails } from "../lib/definitions";

export default function AddToList({
  status,
  details,
}: {
  status: "logged" | "added" | "guest";
  details: TitleDetails;
}) {
  switch (status) {
    case "logged":
      return <AddToListForm id={details.id} type={details.mediaType} />;
    case "added":
      return (
        <LinkButton
          href="/list/recent"
          className="w-full text-center border-transparent bg-blue-500 hover:bg-blue-700 text-white transition-colors mt-3"
        >
          Zarządzaj listą
        </LinkButton>
      );
    default:
      return (
        <>
          <LinkButton
            href="/login"
            className="w-full text-center  bg-yellow-300 text-black border-transparent hover:bg-yellow-400 hover:text-black mt-3"
          >
            Zacznij tworzyć swoją listę
          </LinkButton>
        </>
      );
  }
}
