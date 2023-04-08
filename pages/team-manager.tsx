import React, { useState } from "react";
import { Champion, PlayerUi, Team } from "../types/teams";
import Layout, { LayoutMain, LayoutHeader } from "../components/layout";
import { GetServerSideProps } from "next";
import { ChampionContext } from "../components/context/champion-context";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import { useUserSession } from "../helpers/use-user-session";
import { getUserTeam } from "../lib/get-user-team";
import { ImageWithBackup } from "../components/image-with-backup";
import { TeamPlayers } from "../components/manager/team-players";
import { NoPlayers } from "../components/manager/no-players";
import useSWR, { SWRConfig } from "swr";
import { fetcher } from "../helpers/fetcher";

type Props = {
  champions: { [k: string]: Champion };
  fallback: {
    "/api/team/[id]": Omit<Team, "players"> & { players: PlayerUi[] };
  };
};

const Header: React.FC = () => {
  const { data: team } = useSWR(`/api/team`, fetcher);

  return (
    <div className="flex items-center gap-4">
      <ImageWithBackup
        src={team.imageUrl}
        className="w-10 h-10 rounded-full"
        alt="team image"
      />
      <h1>{team.name}</h1>
    </div>
  );
};

const Main: React.FC = () => {
  const { data: team } = useSWR(`/api/team`, fetcher);

  return team.players.length ? (
    <TeamPlayers team={team} players={team.players} />
  ) : (
    <NoPlayers />
  );
};
export const TeamManager: React.FC<Props> = ({ champions, fallback }) => {
  const user = useUserSession();

  return (
    <SWRConfig value={{ fallback }}>
      <ChampionContext.Provider value={champions}>
        <Layout user={user}>
          <LayoutHeader>
            <Header />
          </LayoutHeader>

          <LayoutMain>
            <Main />
          </LayoutMain>
        </Layout>
      </ChampionContext.Provider>
    </SWRConfig>
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

  const team = await getUserTeam(session, { resolvePlayers: true });

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
      champions,
      fallback: {
        "/api/team": team,
      },
    },
  };
};

export default TeamManager;
