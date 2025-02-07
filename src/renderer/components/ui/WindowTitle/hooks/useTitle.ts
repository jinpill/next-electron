import { useState, useEffect, useMemo } from "react";
import * as ENV from "@/common/ENV";

const useTitle = (name: string) => {
  const [productName, setProductName] = useState("");
  const [mode, setMode] = useState<ENV.Mode>("packaged");

  const title = useMemo(() => {
    if (mode === "development") {
      return `${productName} dev - ${name}`;
    } else {
      return `${productName} - ${name}`;
    }
  }, [name, productName, mode]);

  useEffect(() => {
    if (!window.env || !window.appConfig) return;

    setProductName(window.appConfig.productName);
    setMode(window.env.mode);
  }, []);

  return title;
};

export default useTitle;
