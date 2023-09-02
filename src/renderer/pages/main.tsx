import { useState, useEffect } from "react";
import Head from "next/head";
import * as ENV from "@/common/ENV";

const Main = () => {
  const [versions, setVersions] = useState<ENV.Versions>();

  useEffect(() => {
    if (!window.env) return;
    setVersions(window.env.versions);
  }, []);

  return (
    <>
      <Head>
        <title>Main Window</title>
        <meta name="description" content="This page is for the main window" />
      </Head>

      <main>
        <h1>Main Window</h1>
        <h2>Versions</h2>
        <p>app: {versions?.app}</p>
        <p>node.js: {versions?.node}</p>
        <p>chrome: {versions?.chrome}</p>
        <p>electron: {versions?.electron}</p>
      </main>
    </>
  );
};

export default Main;
