import type { BrowserWindowConstructorOptions } from "electron";
import type { WindowOptions, WindowName } from "./types";

export const commonConfig: BrowserWindowConstructorOptions = {
  width: 1100,
  height: 800,
};

const config: Record<WindowName, WindowOptions> = {
  main: {},
};

export default config;
