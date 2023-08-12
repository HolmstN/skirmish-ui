"use server";

import { JoinTournament } from "../../../../../components/join-tournament";
import Modal from "../../../../../components/client/modal";
import { getTournamentById } from "../../../../../../server/services/get-tournament-by-id";

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
    <Modal title="Join Tournament">
      <JoinTournament id={params.id} name={tournament?.name || ""} />
    </Modal>
  );
}
