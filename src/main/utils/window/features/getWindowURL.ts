import * as env from "@/utils/env";
import type * as ENV from "@/common/ENV";

// 실행 모드에 따라 윈도우의 URL을 반환.
const getWindowURL = (windowName: ENV.WindowName) => {
  if (env.mode === "development") {
    const port = env.getPort();
    return `http://localhost:${port}/${windowName}`;
  } else {
    const scheme = env.getScheme();
    return `${scheme}://app/${windowName}`;
  }
};

export default getWindowURL;
