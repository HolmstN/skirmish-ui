import { useSession } from "next-auth/react";

export const useUserSession = () => {
  const { data } = useSession();

  return {
    name: data?.user?.name || "",
    email: data?.user?.email || "",
    image: data?.user?.image || "",
  };
};
