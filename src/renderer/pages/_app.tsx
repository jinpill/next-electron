import Head from "next/head";
import type { AppProps } from "next/app";
import type * as AppConfig from "@/common/AppConfig";
import type * as ENV from "@/common/ENV";

declare global {
  interface Window {
    appConfig?: AppConfig.ContextBridge;
    env?: ENV.ContextBridge;
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
