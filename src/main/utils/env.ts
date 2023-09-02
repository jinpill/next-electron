import { app } from "electron";
import serve from "next-electron-server";
import path from "path";
import fs from "fs";
import * as ENV from "@/common/ENV";

let initialized = false;
let scheme = "";
let port = 8888;

export const __root = path.resolve(__dirname, "../../");

export const version = app.getVersion();

export const language: ENV.Language = (() => {
  const localeCountryCode = app.getLocaleCountryCode();
  if (localeCountryCode === "KR") return "ko";
  return "en";
})();

export const mode: ENV.Mode = (() => {
  if (!app.isPackaged) return "development";

  const isStaging = version.split("-")[1] === "staging";
  return isStaging ? "staging" : "production";
})();

export const stagingVars: ENV.StagingVars | undefined = (() => {
  const jsonPath = path.resolve(__root, ".staging-vars.json");
  const isExists = fs.existsSync(jsonPath);
  if (!isExists) return;

  const contents = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
  return contents as ENV.StagingVars;
})();

export const os: ENV.OS = (() => {
  const platform = process.platform;
  if (platform === "darwin") return "mac";
  if (platform === "win32") return "windows";
  return "unknown";
})();

export const getScheme = () => scheme;
export const getPort = () => port;

export const initialize = (_scheme: string, _port: number) => {
  if (initialized) return;
  initialized = true;
  scheme = _scheme;
  port = _port;

  if (mode !== "production") {
    const userDataPath = `${app.getPath("userData")} (${mode})`;
    app.setPath("userData", userDataPath);
    scheme += `-${mode}`;
  }

  serve(`${scheme}://app`, {
    port: _port,
    outputDir: "src/renderer/out",
    dev: mode === "development",
  });
};

export default {
  __root,
  version,
  language,
  mode,
  stagingVars,
  os,
  initialize,
  getScheme,
  getPort,
};
