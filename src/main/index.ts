import { app } from "electron";

import env from "@/utils/env";
import window from "@/utils/window";
import logger from "@/utils/logger";
import events from "@/events";

const bootstrap = async () => {
  await events.register();
  await app.whenReady();
  logger.info("My app is", "ready!");

  await window.create("main");
};

env.initialize("myapp", 8888);
bootstrap();
