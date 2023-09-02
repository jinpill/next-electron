import { BrowserWindow } from "electron";
import env from "@/utils/env";
import getStore from "./getStore";
import getPreloadPath from "./getPreloadPath";
import getWindowURL from "./getWindowURL";
import type { WindowOptions, WindowName, WindowUtils } from "../types";

const createWindow = async (
  windowName: WindowName,
  { customOptions, ...options }: WindowOptions,
  windowUtils: WindowUtils,
) => {
  // 윈도우 크기와 위치를 갖는 스토어를 생성.
  const store = getStore({
    windowName,
    groupName: customOptions?.group,
    width: options.width,
    height: options.height,
  });

  // 윈도우의 저장된 최근 크기와 위치를 얻음.
  const state = store.get();
  const preloadPath = getPreloadPath(windowName);

  // customOptions.parent 옵션이 있는 경우, 부모를 설정.
  const parentName = customOptions?.parent;
  const parent = (parentName && windowUtils.get(parentName)) ?? null;

  // BrowserWindow 인스턴스를 생성.
  const win = new BrowserWindow({
    ...options,
    ...state,
    parent: parent || undefined,
    webPreferences: {
      nodeIntegration: true,
      preload: preloadPath,
      ...options.webPreferences,
    },
  });
  win.accessibleTitle = windowName;

  // 윈도우를 이동 또는 크기를 조절할 때, 스테이트 업데이트를 예약.
  win.on("moved", store.getReservation(win, 1000));
  win.on("resized", store.getReservation(win, 1000));

  // 윈도우 화면을 렌더링.
  const windowURL = getWindowURL(windowName);
  await win.loadURL(windowURL);

  // isPreventDevTools 옵션을 설정하지 않은 경우, 개발자 도구를 자동 활성화.
  if (env.mode === "development" && !customOptions?.isPreventDevTools) {
    win.webContents.openDevTools();
  }

  return win;
};

export default createWindow;
