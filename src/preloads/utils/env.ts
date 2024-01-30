import { ipcRenderer } from "electron";
import type * as ENV from "@/common/ENV";

const env: ENV.ContextBridge = ipcRenderer.sendSync("get:env");
export default env;
