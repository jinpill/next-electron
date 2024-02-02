import { app, ipcMain } from "electron";
import * as project from "@/utils/project";
import * as env from "@/utils/env";
import type * as ENV from "@/common/ENV";

export const register = async () => {
  ipcMain.on("get:app-config", (event) => {
    event.returnValue = project.config;
  });

  ipcMain.on("get:env", (event) => {
    const ENV: ENV.ContextBridge = {
      language: env.language,
      mode: env.mode,
      stage: env.stage,
      isProduction: env.isProduction,
      isDevelopment: env.isDevelopment,
      alphaVars: env.alphaVars,
      os: env.os,
      version: {
        app: app.getVersion(),
        node: process.versions.node,
        chrome: process.versions.chrome,
        electron: process.versions.electron,
      },
    };

    event.returnValue = ENV;
  });
};
