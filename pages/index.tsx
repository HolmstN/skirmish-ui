import type { NextPage } from "next";
import Head from "next/head";
// import Image from "next/image";
import { Landing } from "../components/landing";

export const Home: NextPage = () => {
  return (
    <div className="bg-white dark:bg-slate-900">
      <Head>
        <title>Skirmish.io</title>
        <meta name="description" content="gaming community tournament app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="h-screen">
        <div className="py-12 px-12">
          <h1 className="dark:text-white font-bold text-2xl">Skirmish.IO</h1>
        </div>

        <div>
          <Landing />
        </div>
      </main>
      <footer></footer>
    </div>
  );
};

export default Home;
