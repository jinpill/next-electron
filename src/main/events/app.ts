import { app, ipcMain, BrowserWindow } from "electron";
import * as project from "@/utils/project";
import * as env from "@/utils/env";
import * as window from "@/utils/window";
import type * as ENV from "@/common/ENV";

export const register = async () => {
  ipcMain.on("get:app-config", (event) => {
    event.returnValue = project.config;
  });

  ipcMain.on("get:env", (event) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    const windowName = window.getName(win);

    const ENV: ENV.ContextBridge = {
      window: windowName ?? "unknown",
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

  app.on("window-all-closed", () => {
    if (env.os === "mac") return;
    app.quit();
  });

  app.on("browser-window-created", (_, win) => {
    let name: ENV.WindowName | null = null;

    win.on("closed", async () => {
      if (!name) return;
      await window.destroy(name);
    });
  });
};
