import useSWR from "swr";
import { Tag } from "../types/teams";
import { fetcher } from "./fetcher";

export const useTags = (id: string | string[] | undefined) => {
  const { data, error, isLoading } = useSWR<{ teamName: string; tags: Tag[] }>(
    `/api/team/${id}/tags`,
    fetcher
  );

  return {
    teamName: data?.teamName || "",
    tags: data?.tags || [],
    isLoading,
    isError: error,
  };
};
