import useSWR from "swr";
import { fetcher } from "./fetcher";

type Team = {
  name: string;
  players: string[];
};
export const useTeam = (id: string | string[] | undefined) => {
  const { data, error, isLoading } = useSWR<Team>(`/api/team/${id}`, fetcher);

  return {
    team: data,
    isLoading,
    isError: error,
  };
};
