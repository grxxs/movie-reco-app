import { fetchTitleDetails } from "@/app/lib/tmdb";
import { URLParamsSchema } from "@/app/lib/definitions";
import { notFound } from "next/navigation";
import { getType } from "@/app/lib/format/fromat-helper";

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

  console.log(details);

  if (!details) {
    notFound();
  }

  return (
    <div>
      <div>{details.title}</div>
      <p>{getType(details.mediaType)}</p>
      <p>{details.overview}</p>
    </div>
  );
}
