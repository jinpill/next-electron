import { app } from "electron";
import env from "./utils/env";
import window from "./utils/window";

const bootstrap = async () => {
  app.on("window-all-closed", () => {
    if (env.os === "mac") return;
    app.quit();
  });

  await app.whenReady();

  window.create("main", {
    width: 800,
    height: 600,
  });
};

env.initialize();
bootstrap();
