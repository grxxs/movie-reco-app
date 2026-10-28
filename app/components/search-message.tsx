import LinkButton from "./linkbutton";

export default function SearchMessage({ message }: { message: string }) {
  return (
    <div className="flex flex-1 flex-col justify-center items-center -mt-40">
      <p className="text-xl font-bold py-2">{message}</p>
      <LinkButton
        href="/"
        className="border-transparent bg-blue-500 hover:bg-blue-700 text-white"
      >
        Wróć do wyszukiwania
      </LinkButton>
    </div>
  );
}
