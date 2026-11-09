import Button from "./button";
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
        <Button
          disabled
          className="w-full text-center bg-gray-600 border border-transparent hover:bg-gray-600 mt-3"
        >
          Na liście
        </Button>
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
