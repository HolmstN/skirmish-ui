import { useUser } from "../helpers/use-user";

export const ProfileImage = () => {
  const { user, isLoading, isError } = useUser("luke@jedi.com");

  if (isLoading) {
    return (
      <>
        <span className="sr-only">Open user menu</span>
        <img className="h-8 w-8 rounded-full" src="" alt="" />
      </>
    );
  }

  if (isError || !user) {
    return <div>Error</div>;
  }

  return (
    <>
      <span className="sr-only">Open user menu</span>
      <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" />
    </>
  );
};
