import { usePathname } from "next/navigation";
import { NavLinks } from "./components/client/nav-links";

export const Sidebar = () => {
  return (
    <div className="h-full flex grow flex-col gap-y-5 overflow-y-auto bg-sky-800 dark:bg-slate-900 px-6 pb-4 dark:border-r dark:border-slate-800">
      <div className="flex h-16 shrink-0 items-center">
        <img
          className="h-8 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=white"
          alt="Your Company"
        />
      </div>
      <NavLinks />
    </div>
  );
};
