import type { NextPage } from "next";
import Link from "next/link";
import { Tab } from "../components/tab";

export const Home: NextPage = () => {
  return (
    <div className="flex py-12 justify-center items-center">
      <Link href="/find-team">
        <Tab className="hover:bg-slate-600 p-24">Find Team</Tab>
      </Link>
      <Link href="/create-team">
        <Tab className="hover:bg-slate-600 p-24">Create Team</Tab>
      </Link>
      <Link href="/stats">
        <Tab className="hover:bg-slate-600 p-24">Stats</Tab>
      </Link>
    </div>
  );
};

export default Home;
