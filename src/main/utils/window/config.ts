import type { BrowserWindowConstructorOptions } from "electron";
import type { WindowOptions } from "./types";
import type * as ENV from "@/common/ENV";

export const commonConfig: BrowserWindowConstructorOptions = {
  width: 1100,
  height: 800,
};

const config: Record<ENV.WindowName, WindowOptions> = {
  main: {},
};

export default config;
