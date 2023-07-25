import type { NextApiRequest, NextApiResponse } from "next";
import { Mastery } from "../../../../types/riot/mastery";

const RIOTAPI = "https://na1.api.riotgames.com";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name } = req.query;
  try {
    const srRes = await fetch(
      `${RIOTAPI}/lol/summoner/v4/summoners/by-name/${name}`,
      {
        headers: {
          "X-Riot-Token": process.env.RIOT_API_KEY,
        },
      }
    );
    const { id } = await srRes.json();

    const masteryRes = await fetch(
      `${RIOTAPI}/lol/champion-mastery/v4/champion-masteries/by-summoner/${id}`,
      {
        headers: {
          "X-Riot-Token": process.env.RIOT_API_KEY,
        },
      }
    );

    const masteriesRaw = (await masteryRes.json()) as Mastery[];

    const masteries = masteriesRaw.map(
      ({ championId, lastPlayTime, championLevel, championPoints }) => ({
        championId,
        lastPlayTime,
        championLevel,
        championPoints,
      })
    );

    return res.status(200).send(masteries);
  } catch (e) {
    console.error(e);
    return res.status(500).send({ error: e });
  }
}
