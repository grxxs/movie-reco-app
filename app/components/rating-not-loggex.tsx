import { GoStarFill } from "react-icons/go";
import LinkButton from "@/app/components/linkbutton";

export default function RatingNotLogged() {
  return (
    <div className="flex flex-col items-center gap-3 mt-4">
      <div className="flex flex-row">
        {[1, 2, 3, 4, 5].map((n) => (
          <div aria-hidden key={n}>
            <GoStarFill className="text-3xl mx-1.5 text-gray-500" />
          </div>
        ))}
      </div>

      <LinkButton
        href="/login"
        className="w-full bg-yellow-300 border-transparent text-center hover:bg-yellow-400 transition-colors"
      >
        Zaloguj się aby zacząć oceniać
      </LinkButton>
    </div>
  );
}
