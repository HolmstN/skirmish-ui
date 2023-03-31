import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Layout from "../components/layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <title>Skirmish.io</title>
        <meta name="description" content="gaming community tournament app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DndProvider backend={HTML5Backend}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </DndProvider>
    </div>
  );
}

export default MyApp;
