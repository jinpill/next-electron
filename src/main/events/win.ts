import { app, ipcMain, BrowserWindow } from "electron";
import * as env from "@/utils/env";
import * as window from "@/utils/window";
import type * as Win from "@/common/Win";

export const register = () => {
  ipcMain.on("get:window-config", async (event) => {
    const config: Win.Config = {
      name: "unknown",
      isClosable: true,
      isMinimizable: true,
      isMaximizable: true,
    };

    const windowName = await window.getName(event.sender);
    if (windowName) {
      config.name = windowName;
    } else {
      event.returnValue = config;
      return;
    }

    const win = BrowserWindow.fromWebContents(event.sender);
    if (!win) {
      event.returnValue = config;
      return;
    }

    config.isClosable = win.closable;
    config.isMinimizable = win.minimizable;
    config.isMaximizable = win.maximizable;

    event.returnValue = config;
  });

  ipcMain.on("run:control-window", async (event, action: Win.ControlAction) => {
    if (!action.target) {
      const windowName = await window.getName(event.sender);

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

    win.on("show", async () => {
      name = await window.getName(win);
    });

    win.on("closed", async () => {
      if (!name) return;
      await window.destroy(name);
    });
  });
};
