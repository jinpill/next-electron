import { BrowserWindow } from "electron";
import type * as ENV from "@/common/ENV";

/**
 * BrowserWindow 인스턴스를 각 이름으로 저장하기 위한 맵.
 */
const windows = new Map<ENV.WindowName, BrowserWindow>();

export default windows;
