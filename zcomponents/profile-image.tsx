import { User } from "../types/users";

type Props = {
  user: User;
};

export const ProfileImage: React.FC<Props> = ({ user }) => {
  return (
    <>
      <span className="sr-only">Open user menu</span>
      <img className="h-8 w-8 rounded-full" src={user.image} alt="" />
    </>
  );
};
