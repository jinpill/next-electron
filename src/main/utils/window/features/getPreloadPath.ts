import path from "path";
import * as project from "@/utils/project";
import type * as ENV from "@/common/ENV";

const getPreloadPath = (windowName: ENV.WindowName) => {
  const preloadPath = `./dist/preloads/${windowName}.bundle.js`;
  return path.resolve(project.__root, preloadPath);
};

export default getPreloadPath;
