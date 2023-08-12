import { getTournamentById } from "../../../../../server/services/get-tournament-by-id";
import { JoinTournament } from "../../../../components/join-tournament";

export async function getData({ id }: { id: string }) {
  const res = await getTournamentById({ id });

  if (res.error) {
    return null;
  }

  return res.value;
}

export default async function Join({
  params,
}: {
  name: string;
  params: { id: string };
}) {
  const tournament = await getData({ id: params.id });
  return (
    <div className="pt-2 mt-2 border-t border-indigo-600">
      <JoinTournament id={params.id} name={tournament?.name || ""} />
    </div>
  );
}
