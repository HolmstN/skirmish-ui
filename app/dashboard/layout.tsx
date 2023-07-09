import { MoonIcon, BellAlertIcon } from "@heroicons/react/24/outline";

import { Sidebar } from "./sidebar";
import { UserCircleIcon } from "@heroicons/react/20/solid";

const Layout: React.FC = ({ children }) => {
  return (
    <div className="flex min-h-full">
      <div className="lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <Sidebar />
      </div>
      <div className="lg:pl-72 w-full">
        <main>
          <header className="bg-white flex items-center border-b border-gray-300">
            <div className="text-gray-700 flex-1 pl-2">Username</div>
            <MoonIcon className="h-8 w-8 m-2" />
            <BellAlertIcon className="h-8 w-8 m-2" />
            <div className="border-l border-gray-300 pl-1">
              <UserCircleIcon className="h-8 w-8 mx-2" />
            </div>
          </header>
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="pt-2">
              <h2>Dashboard</h2>
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
