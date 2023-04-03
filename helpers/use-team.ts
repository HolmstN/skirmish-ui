import useSWR from "swr";
import { PlayerUi, Team } from "../types/teams";
import { fetcher } from "./fetcher";

export const useTeam = (id: string | string[] | undefined) => {
  const { data, error, isLoading } = useSWR<Team>(`/api/team/${id}`, fetcher);

  return {
    team: data,
    isLoading,
    isError: error,
  };
};
