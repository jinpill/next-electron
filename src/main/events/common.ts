import { app } from "electron";
import * as mainProcess from "@/events/utils/mainProcess";

import * as env from "@/utils/env";
import * as window from "@/utils/window";

export const register = () => {
  app.on("window-all-closed", () => {
    if (env.os === "mac") return;
    app.quit();
  });

  mainProcess.on.app((win) => {
    win.on("closed", async () => {
      const name = await window.getName(win);
      if (!name) return;

      win.removeAllListeners();
      await window.destroy(name);
    });
  });
};
