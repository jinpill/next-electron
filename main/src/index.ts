import { app } from "electron";
import installExtension, {
  REACT_DEVELOPER_TOOLS,
} from "electron-devtools-installer";

import env from "@/utils/env";
import window from "@/utils/window";
import events from "@/events";

const bootstrap = async () => {
  await events.register();
  await app.whenReady();
  await installExtension(REACT_DEVELOPER_TOOLS);

  await window.create("main", true, {
    width: 800,
    height: 600,
  });
};

env.initialize("myapp", 8888);
bootstrap();
