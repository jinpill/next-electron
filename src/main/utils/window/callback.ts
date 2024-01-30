import type { CallbackMaps, CallbackType } from "./types";
import type * as ENV from "@/common/ENV";

const callbacks: CallbackMaps = {};

export default {
  run: (windowName: ENV.WindowName, type: CallbackType) => {
    const callback = callbacks[windowName]?.[type];
    return callback ?? (() => {});
  },
};
