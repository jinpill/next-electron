import { app } from "electron";
import installExtension, {
  REACT_DEVELOPER_TOOLS,
} from "electron-devtools-installer";

import env from "@/utils/env";
import window from "@/utils/window";
import logger from "@/utils/logger";
import events from "@/events";

const bootstrap = async () => {
  await events.register();
  await app.whenReady();
  await installExtension(REACT_DEVELOPER_TOOLS);
  logger.log("My app is", "ready!");

  await window.create("main", true, {
    width: 800,
    height: 600,
  });
};

env.initialize("myapp", 8888);
bootstrap();
