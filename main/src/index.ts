import { app } from "electron";
import env from "@/utils/env";
import window from "@/utils/window";

const bootstrap = async () => {
  app.on("window-all-closed", () => {
    if (env.os === "mac") return;
    app.quit();
  });

  await app.whenReady();

  await window.create("main", true, {
    width: 800,
    height: 600,
  });
};

env.initialize("myapp", 8888);
bootstrap();
