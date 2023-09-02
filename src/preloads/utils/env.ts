import { ipcRenderer, contextBridge } from "electron";
import ENV from "@/common/ENV";

const env: ENV = ipcRenderer.sendSync("bind:env");
contextBridge.exposeInMainWorld("env", env);
