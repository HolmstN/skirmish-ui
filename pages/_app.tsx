import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <title>Skirmish.io</title>
        <meta name="description" content="gaming community tournament app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="py-12 px-12">
        <h1>Skirmish.IO</h1>
      </div>
      <DndProvider backend={HTML5Backend}>
        <Component {...pageProps} />
      </DndProvider>
    </div>
  );
}

export default MyApp;
