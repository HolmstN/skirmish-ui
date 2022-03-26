import type { NextPage } from "next";
// import Image from "next/image";
import { Landing } from "../components/landing";

export const Home: NextPage = () => {
  return (
    <>
      <main>
        <div>
          <Landing />
        </div>
      </main>
      <footer></footer>
    </>
  );
};

export default Home;
