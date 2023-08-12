"use client";

import { Fragment, ReactNode } from "react";
import { Popover, Transition } from "@headlessui/react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { UserCircleIcon } from "@heroicons/react/24/outline";

type Props = {
  userImage?: string | null;
};
export default function UserQuickSettings({ userImage }: Props) {
  return (
    <Popover className="relative">
      <Popover.Button className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
        {userImage ? (
          <Image
            src={userImage}
            height={200}
            width={200}
            alt="user image"
            className="w-8 h-8 rounded-full"
          />
        ) : (
          <UserCircleIcon className="h-8 w-8 mx-2 dark:text-slate-400" />
        )}
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-min -translate-x-56 px-4">
          <div className="w-56 shrink rounded-xl bg-white p-4 text-sm font-semibold leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5">
            <div
              onClick={() => signOut()}
              className="block p-2 hover:text-indigo-600"
            >
              Sign Out
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
