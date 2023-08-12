import chalk from "chalk";
import { addTournamentPlayer } from "../../../../server/services/add-tournament-player";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const d = await request.json();

  try {
    const res = await addTournamentPlayer({
      playerId: d.playerId,
      tournamentId: d.tournamentId,
      gamedata: d.gamedata,
    });
    if (res.error) {
      throw new Error(res.error);
    }

    return NextResponse.json(res.value);
  } catch (e) {
    console.error(e);
    console.log(chalk.red(e));
    return new NextResponse("Failed to add tournament player", { status: 500 });
  }
}
