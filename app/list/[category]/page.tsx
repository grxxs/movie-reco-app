import { ListURLParamsSchema, listStatusString } from "@/app/lib/definitions";
import { notFound, redirect } from "next/navigation";
import { getCurrentUser } from "@/app/lib/database/get-current-user";
import { getUserList } from "@/app/lib/database/get-productions";
import UserCategoryList from "@/app/components/list/user-category-list";

export default async function ListCategory({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const validatedFields = ListURLParamsSchema.safeParse({
    category: category,
  });

  if (!validatedFields.success) {
    notFound();
  }

  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  const list = await getUserList(user.id);
  const watched = list.filter((title) => title.status === "WATCHED");
  const watching = list.filter((title) => title.status === "WATCHING");
  const planned = list.filter((title) => title.status === "PLANNED");
  const highestRating = list
    .filter((title) => title.rating !== null)
    .toSorted((a, b) => (b.rating ?? 0) - (a.rating ?? 0));

  switch (validatedFields.data.category) {
    case "planned":
      return (
        <div className="flex flex-col items-center my-8">
          <UserCategoryList list={planned} title={listStatusString.planned} />
        </div>
      );
    case "watching":
      return (
        <div className="flex flex-col items-center my-8">
          <UserCategoryList list={watching} title={listStatusString.watching} />
        </div>
      );
    case "watched":
      return (
        <div className="flex flex-col items-center my-8">
          <UserCategoryList list={watched} title={listStatusString.watched} />
        </div>
      );
    case "recent":
      return (
        <div className="flex flex-col items-center my-8">
          <UserCategoryList list={list} title={listStatusString.recent} />
        </div>
      );
    case "rated":
      return (
        <div className="flex flex-col items-center my-8">
          <UserCategoryList
            list={highestRating}
            title={listStatusString.rated}
          />
        </div>
      );
  }
}
