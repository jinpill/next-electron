import path from "path";
import env from "@/utils/env";
import type { WindowName } from "../types";

const getPreloadPath = (windowName: WindowName) => {
  const preloadPath = `./dist/preloads/${windowName}.bundle.js`;
  return path.resolve(env.__root, preloadPath);
};

export default getPreloadPath;
