import env from "@/utils/env";
import type { WindowName } from "../types";

// 실행 모드에 따라 윈도우의 URL을 반환.
const getWindowURL = (windowName: WindowName) => {
  if (env.mode === "development") {
    const port = env.getPort();
    return `http://localhost:${port}/${windowName}`;
  } else {
    const scheme = env.getScheme();
    return `${scheme}://app/${windowName}`;
  }
};

export default getWindowURL;
