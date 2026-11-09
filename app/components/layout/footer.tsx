import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-blue-950 text-white">
      <div className="flex flex-col items-center justify-center gap-1 p-4">
        <Image
          src="/tmdb.svg"
          width={300}
          height={39}
          alt="The movie database logo"
          className="h-2 w-auto"
        />
        <div className="text-xs italic font-semibold">
          This application uses TMDB and the TMDB APIs but is not endorsed,
          certified, or otherwise approved by TMDB.
        </div>
      </div>
    </footer>
  );
}
