import Link from "next/link";

export const Landing = () => {
  return (
    <div className="flex py-12 align-center justify-center items-center mx-auto">
      <Link href="/find-team">
        <div className="hover:cursor-pointer hover:bg-slate-300 bg-slate-600 mx-12 py-24 w-1/4 rounded">
          <span className="ml-12">Find Team</span>
        </div>
      </Link>
      <Link href="/create-team">
        <div className="hover:cursor-pointer hover:bg-slate-300 bg-slate-600 mx-12 py-24 w-1/4 rounded">
          <span className="ml-12">Create Team</span>
        </div>
      </Link>
      <Link href="/stats">
        <div className="hover:cursor-pointer hover:bg-slate-300 bg-slate-600 mx-12 py-24 w-1/4 rounded">
          <span className="ml-12">Stats</span>
        </div>
      </Link>
    </div>
  );
};
