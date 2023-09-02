import { app } from "electron";
import env from "@/utils/env";

export const register = () => {
  app.on("window-all-closed", () => {
    if (env.os === "mac") return;
    app.quit();
  });
};
