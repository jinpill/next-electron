import { ipcRenderer } from "electron";
import type * as AppConfig from "@/common/AppConfig";

const appConfig: AppConfig.ContextBridge =
  ipcRenderer.sendSync("get:app-config");
export default appConfig;
