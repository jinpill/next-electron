import path from "path";
import * as env from "@/utils/env";
import type * as ENV from "@/common/ENV";

const getPreloadPath = (windowName: ENV.WindowName) => {
  const preloadPath = `./dist/preloads/${windowName}.bundle.js`;
  return path.resolve(env.__root, preloadPath);
};

export default getPreloadPath;
