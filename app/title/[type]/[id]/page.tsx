export default async function Title({
  params,
}: {
  params: Promise<{ type: string; id: string }>;
}) {
  const { type, id } = await params;
  return (
    <div>
      <div>Film</div>
      <p>Typ: {type}</p>
      <p>Id: {id}</p>
    </div>
  );
}
