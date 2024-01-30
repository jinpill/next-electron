import { useEffect, useMemo, useState } from "react";
import Head from "next/head";
import * as ENV from "@/common/ENV";

/** 일렉트론 앱 이름 */
const APP_NAME = "My App";

type WindowTitleProps = {
  name: string;
};

const WindowTitle = (props: WindowTitleProps) => {
  const [mode, setMode] = useState<ENV.Mode>("packaged");
  const [stage, setStage] = useState<ENV.Stage>("stable");

  const title = useMemo(() => {
    if (mode === "development") return `${APP_NAME} dev - ${props.name}`;
    else if (stage !== "stable") return `${APP_NAME} ${stage} - ${props.name}`;
    return `${APP_NAME} - ${props.name}`;
  }, [props.name, mode, stage]);

  useEffect(() => {
    if (!window.env) return;
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
