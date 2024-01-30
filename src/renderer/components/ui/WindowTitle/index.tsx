import { useEffect, useMemo, useState } from "react";
import Head from "next/head";
import * as ENV from "@/common/ENV";

type WindowTitleProps = {
  name: string;
};

const WindowTitle = (props: WindowTitleProps) => {
  const [productName, setProductName] = useState("");
  const [mode, setMode] = useState<ENV.Mode>("packaged");
  const [stage, setStage] = useState<ENV.Stage>("stable");

  const title = useMemo(() => {
    if (mode === "development") {
      return `${productName} dev - ${props.name}`;
    } else if (stage !== "stable") {
      return `${productName} ${stage} - ${props.name}`;
    } else {
      return `${productName} - ${props.name}`;
    }
  }, [props.name, productName, mode, stage]);

  useEffect(() => {
    if (!window.env || !window.appConfig) return;

    setProductName(window.appConfig.productName);
    setMode(window.env.mode);
    setStage(window.env.stage);
  }, []);

  return (
    <Head>
      <title>{title}</title>
    </Head>
  );
};

export default WindowTitle;
