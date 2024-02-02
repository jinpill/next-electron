import { ipcRenderer, contextBridge } from "electron";
import type * as Win from "@/common/Win";

const win: Win.ContextBridge = {
  config: ipcRenderer.sendSync("get:window-config"),
  control: (action) => {
    ipcRenderer.sendSync("run:control-window", action);
  },
};

contextBridge.exposeInMainWorld("win", win);
