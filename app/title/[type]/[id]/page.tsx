import { fetchTitleDetails } from "@/app/lib/tmdb";
import { URLParamsSchema } from "@/app/lib/definitions";
import { notFound } from "next/navigation";
import { SearchResultDetails } from "@/app/components/search-results-details";

export default async function Title({
  params,
}: {
  params: Promise<{ type: string; id: string }>;
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

  return <SearchResultDetails details={details} />;
}
