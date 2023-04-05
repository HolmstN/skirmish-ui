import classNames from "classnames";
import Link from "next/link";
import { User } from "../types/users";
import { useNavigation } from "../helpers/use-navigation";

type Props = {
  user: User;
};
export const Navigation: React.FC<Props> = ({ user }) => {
  const navigation = useNavigation();

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
