import Head from "next/head";
import type { AppProps } from "next/app";
import type { Versions } from "@t/Versions";

declare global {
  interface Window {
    versions: Versions;
  }
}

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Component {...pageProps} />
  </>
);

export default App;
