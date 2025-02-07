import { app } from "electron";
import serve from "next-electron-server";

import * as project from "@/utils/project";
import type * as ENV from "@/common/ENV";

let initialized = false;
let scheme = "";
let port = 8888;

export const language: ENV.Language = (() => {
  const localeCountryCode = app.getLocaleCountryCode();
  if (localeCountryCode === "KR") return "ko";
  return "en";
})();

export const mode: ENV.Mode = (() => {
  if (!app.isPackaged) return "development";
  else return "packaged";
})();

export const version: ENV.Version = (() => {
  return {
    app: app.getVersion(),
    node: process.versions.node,
    chrome: process.versions.chrome,
    electron: process.versions.electron,
  };
})();

export const os: ENV.OS = (() => {
  if (process.platform === "darwin") return "mac";
  if (process.platform === "win32") return "windows";
  return "unknown";
})();

export const getScheme = () => scheme;
export const getPort = () => port;

export const initialize = () => {
  if (initialized) return;
  initialized = true;
  scheme = project.config.scheme;
  port = project.config.port;

  // 패키지 앱인 경우, 렌더러 프로세스 서버를 실행.
  if (mode === "packaged") {
    serve(`${scheme}://app`, {
      port: port,
      outputDir: "src/renderer/out",
      dev: false,
    });
  }

  // 메모리 할당량을 4GB로 설정.
  app.commandLine.appendSwitch("js-flags", "--max-old-space-size=4096");
};
