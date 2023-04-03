import useSWR from "swr";
import { fetcher } from "./fetcher";
import { User } from "../types/users";

export const useUser = (id: string) => {
  const { data, error, isLoading } = useSWR<User>(`/api/user/${id}`, fetcher);

  return {
    user: data,
    isLoading,
    isError: error,
  };
};
