import Link from "next/link";
import React from "react";

type Props = {
  header?: string;
};
export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <div className="flex pl-6 mb-4 border-b h-12 bg-slate-700">
        <Link href="/" className="flex-initial mr-8">
          <h2>Skirmish.IO</h2>
        </Link>
        <div className="flex gap-x-8 items-center flex-1">
          <Link href="/team/1/dashboard">Dashboard</Link>
          <Link href="/team/1/tags">Tags</Link>
        </div>
      </div>
      <div className="px-32">{children}</div>
    </>
  );
};

export default Layout;
