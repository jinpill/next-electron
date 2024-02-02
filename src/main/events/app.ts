import { app, ipcMain, BrowserWindow } from "electron";
import * as project from "@/utils/project";
import * as env from "@/utils/env";
import * as window from "@/utils/window";

import type * as ENV from "@/common/ENV";
import type * as Win from "@/common/Win";

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

  ipcMain.on("get:window-name", (event) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    const windowName = window.getName(win);
    event.returnValue = windowName;
  });

  ipcMain.on("run:control-window", async (event, action: Win.ControlAction) => {
    if (!action.target) {
      const win = BrowserWindow.fromWebContents(event.sender);
      const windowName = window.getName(win);

      if (windowName) {
        action.target = windowName;
      } else {
        event.returnValue = false;
        return;
      }
    }

    if (action.type !== "open" && action.type !== "close") {
      const win = await window.get(action.target);
      if (!win) {
        event.returnValue = false;
        return;
      }

      switch (action.type) {
        case "minimize":
          win.minimize();
          break;
        case "maximize":
          win.maximize();
          break;
        case "unmaximize":
          win.unmaximize();
          break;
      }

      event.returnValue = true;
      return;
    }

    switch (action.type) {
      case "open":
        await window.create(action.target);
        break;
      case "close":
        await window.close(action.target);
        break;
    }

    event.returnValue = true;
  });

  app.on("window-all-closed", () => {
    if (env.os === "mac") return;
    app.quit();
  });

  app.on("browser-window-created", (_, win) => {
    let name: Win.Name | null = null;

    win.on("closed", async () => {
      if (!name) return;
      await window.destroy(name);
    });
  });
};
