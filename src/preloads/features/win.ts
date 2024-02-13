import { contextBridge } from "electron";
import * as rendererProcess from "@/utils/rendererProcess";
import type * as Win from "@/common/Win";

const win: Win.ContextBridge = {
  getConfig: () => {
    return rendererProcess.send.get("window-config");
  },
  control: async (action) => {
    await rendererProcess.send.run("control-window", action);
  },
};

rendererProcess.on.set(
  "window-maximized",
  (_, data: Win.Event.Set.Maximized) => {
    console.log(data.isMaximized);
  },
);

contextBridge.exposeInMainWorld("win", win);
