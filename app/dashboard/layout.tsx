import { BellAlertIcon } from "@heroicons/react/24/outline";

import { Sidebar } from "./sidebar";
import { UserCircleIcon } from "@heroicons/react/20/solid";

const Layout: React.FC = ({ children }) => {
  return (
    <div className="flex min-h-full">
      <div className="lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-60 lg:flex-col">
        <Sidebar />
      </div>
      <div className="lg:pl-60 w-full">
        <main>
          <header className="bg-white dark:bg-slate-900 flex items-center border-b border-l border-sky-300 dark:border-slate-800">
            <div className="text-gray-700 dark:text-slate-300 font-medium flex-1 pl-2">
              Username
            </div>
            <BellAlertIcon className="h-8 w-8 m-2 dark:text-slate-400" />
            <div className="border-l border-gray-300 dark:border-slate-700 pl-1">
              <UserCircleIcon className="h-8 w-8 mx-2 dark:text-slate-400" />
            </div>
          </header>
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="pt-4">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
