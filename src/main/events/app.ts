import { app, ipcMain } from "electron";
import env from "@/utils/env";
import ENV from "@/common/ENV";

export const register = () => {
  app.on("window-all-closed", () => {
    if (env.os === "mac") return;
    app.quit();
  });

  ipcMain.on("bind:env", (event) => {
    const ENV: ENV = {
      language: env.language,
      mode: env.mode,
      stagingVars: env.stagingVars,
      os: env.os,
      versions: {
        app: env.version,
        node: process.versions.node,
        electron: process.versions.electron,
        chrome: process.versions.chrome,
      },
    };

    event.returnValue = ENV;
  });
};
