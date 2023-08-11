import { BellAlertIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { Sidebar } from "../sidebar";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { ReactNode } from "react";

const Layout: React.FC<{ modal: ReactNode }> = async ({ children, modal }) => {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex min-h-full">
      <div className="lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-60 lg:flex-col">
        <Sidebar />
      </div>
      <div className="lg:pl-60 w-full">
        <header className="bg-white dark:bg-slate-900 flex items-center border-b border-l border-sky-300 dark:border-slate-800 pr-2">
          <div className="text-gray-700 dark:text-slate-300 font-medium flex-1 pl-2">
            {session?.user?.name}
          </div>
          <BellAlertIcon className="h-8 w-8 m-2 dark:text-slate-400" />
          <div className="border-l border-gray-300 dark:border-slate-700 pl-1">
            {session?.user?.image ? (
              <Image
                src={session.user.image}
                height={200}
                width={200}
                alt="user image"
                className="w-6 h-6 rounded-full"
              />
            ) : (
              <UserCircleIcon className="h-8 w-8 mx-2 dark:text-slate-400" />
            )}
          </div>
        </header>
        <main>
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="pt-4">{children}</div>
          </div>
        </main>
      </div>
      {modal}
    </div>
  );
};

export default Layout;
