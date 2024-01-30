import { ipcRenderer } from "electron";
import type { ContextBridge } from "@/common/ENV";

const env: ContextBridge = ipcRenderer.sendSync("get:env");
export default env;
