import { useState, useEffect } from "react";
import Head from "next/head";

const Main = () => {
  const [versions, setVersions] = useState<typeof window.versions>();

  useEffect(() => {
    setVersions(window.versions);
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
        <p>node.js: {versions?.node()}</p>
        <p>chrome: {versions?.chrome()}</p>
        <p>electron: {versions?.electron()}</p>
      </main>
    </>
  );
};

export default Main;
