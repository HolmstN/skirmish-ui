import React, { useState } from "react";
import { PlayerChamps } from "../../../components/team/player-champs";
import { Champion, PlayerUi, Team } from "../../../types/teams";
import Layout, { LayoutMain, LayoutHeader } from "../../../components/layout";
import classnames from "classnames";
import { GetServerSideProps } from "next";
import { Transition } from "@headlessui/react";
import { ChampionContext } from "../../../components/context/champion-context";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]";
import { useUserSession } from "../../../helpers/use-user-session";
import { getUserTeam } from "../../../lib/get-user-team";
import { ImageWithBackup } from "../../../components/image-with-backup";
import { TeamPlayers } from "../../../components/manager/team-players";
import { NoPlayers } from "../../../components/manager/no-players";

type Props = {
  team: Team;
  champions: { [k: string]: Champion };
};
export const TeamManager: React.FC<Props> = ({ team, champions }) => {
  const user = useUserSession();

  return (
    <ChampionContext.Provider value={champions}>
      <Layout team={team} user={user}>
        <LayoutHeader>
          <div className="flex items-center gap-4">
            <ImageWithBackup
              src={team.imageUrl}
              className="w-10 h-10 rounded-full"
              alt="team image"
            />
            <h1>{team.name}</h1>
          </div>
        </LayoutHeader>

        <LayoutMain>
          {team.players.length ? (
            <TeamPlayers players={team.players} />
          ) : (
            <NoPlayers />
          )}
        </LayoutMain>
      </Layout>
    </ChampionContext.Provider>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session?.user) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: true,
      },
    };
  }

  const team = await getUserTeam(session);

  const championsRes = await fetch(
    "http://ddragon.leagueoflegends.com/cdn/13.6.1/data/en_US/champion.json"
  );
  const championsJson = (await championsRes.json()) as {
    data: { [k: string]: Champion };
  };

  const champions = championsJson.data;

  return {
    props: {
      session,
      team,
      champions,
    },
  };
};

export default TeamManager;
