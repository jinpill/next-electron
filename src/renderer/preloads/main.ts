import { contextBridge } from "electron";
import type { Versions } from "@t/Versions";

const versions: Versions = {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
};

contextBridge.exposeInMainWorld("versions", versions);
