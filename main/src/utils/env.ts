import { app } from "electron";
import serve from "next-electron-server";

const { env, platform } = process;
let initialized = false;
let scheme = "";

export type Mode = "production" | "test" | "development";
export type OS = "mac" | "windows" | "unknown";

export const mode: Mode = (() => {
  if (app.isPackaged) return "production";
  if (env.TEST === "true") return "test";
  return "development";
})();

export const os: OS = (() => {
  if (platform === "darwin") return "mac";
  if (platform === "win32") return "windows";
  return "unknown";
})();

export const getScheme = () => scheme;

export const initialize = (_scheme: string, port: number) => {
  if (initialized) return;
  initialized = true;
  scheme = _scheme;

  if (mode !== "production") {
    const userDataPath = `${app.getPath("userData")} (${mode})`;
    app.setPath("userData", userDataPath);
  }

  serve(`${_scheme}://app`, {
    port,
    outputDir: "renderer/out",
    dev: mode === "development",
  });
};

export default {
  mode,
  os,
  initialize,
  getScheme,
};
