import { app } from "electron";

import * as env from "@/utils/env";
import * as window from "@/utils/window";
import * as logger from "@/utils/logger";
import * as events from "@/events";

const bootstrap = async () => {
  logger.log("Bootstrap");
  await events.register();
  await app.whenReady();

  logger.info("My app is ready!");
  await window.create("main");
};

env.initialize("my-app", 8888);
bootstrap();
