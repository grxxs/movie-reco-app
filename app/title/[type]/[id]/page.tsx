import { fetchTitleDetails } from "@/app/lib/tmdb";
import { URLParamsSchema } from "@/app/lib/definitions";
import { notFound } from "next/navigation";
import { SearchResultDetails } from "@/app/components/search-results-details";
import { getCurrentUser } from "@/app/lib/database/get-current-user";
import { isProductionOnList } from "@/app/lib/database/check-production";
import { getTypeDB } from "@/app/lib/format/fromat-helper";

export default async function Title({
  params,
}: {
  params: Promise<{ type: "movie" | "tv"; id: string }>;
}) {
  const { type, id } = await params;
  const validatedFields = URLParamsSchema.safeParse({
    id: id,
    type: type,
  });

  if (!validatedFields.success) {
    notFound();
  }
  const details = await fetchTitleDetails({
    id: validatedFields.data.id,
    type: validatedFields.data.type,
  });

  if (!details) {
    notFound();
  }

  const user = await getCurrentUser();
  let isOnList: boolean = false;
  let isUser: boolean = false;

  if (user) {
    const typeDB = getTypeDB(type);
    isOnList = await isProductionOnList(
      user.id,
      validatedFields.data.id,
      typeDB,
    );
    isUser = true;
  }

  return (
    <SearchResultDetails details={details} user={isUser} onList={isOnList} />
  );
}
