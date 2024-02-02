import { ipcRenderer, contextBridge } from "electron";
import type * as Win from "@/common/Win";

const win: Win.ContextBridge = {
  name: ipcRenderer.sendSync("get:window-name"),
  control: (action) => {
    ipcRenderer.sendSync("run:control-window", action);
  },
};

contextBridge.exposeInMainWorld("win", win);
