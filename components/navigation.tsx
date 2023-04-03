import classNames from "classnames";
import Link from "next/link";
import { useUser } from "../helpers/use-user";
import { useRouter } from "next/router";
import { User } from "../types/users";

type Props = {
  user: User;
};
export const Navigation: React.FC<Props> = ({ user }) => {
  const router = useRouter();

  const navigation = [
    {
      name: "Dashboard",
      href: `/team/${user.team}/dashboard`,
      current: router.pathname.includes("dashboard"),
    },
    {
      name: "Tags",
      href: `/team/${user.team}/tags`,
      current: router.pathname.includes("tags"),
    },
  ];

  return (
    <div className="hidden md:block">
      <div className="ml-10 flex items-baseline space-x-4">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={classNames(
              item.current
                ? "bg-indigo-700 text-white"
                : "text-white hover:bg-indigo-500 hover:bg-opacity-75",
              "rounded-md px-3 py-2 text-sm font-medium"
            )}
            aria-current={item.current ? "page" : undefined}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
};
