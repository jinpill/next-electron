import { BrowserWindow } from "electron";
import * as logger from "@/utils/logger";

import windows from "./windows";
import callback from "./callback";
import config, { commonConfig } from "./config";
import createWindow from "./features/createWindow";

import type { WindowUtils } from "./types";

import type * as ENV from "@/common/ENV";

/**
 * 윈도우 이름을 입력하여, 미리 정의된 옵션으로 윈도우를 생성하는 함수.
 */
export const create = async (windowName: ENV.WindowName) => {
  const result = callback.run(windowName, "will-create")(windowUtils);
  if (result === false) return null;

  // 이미 생성된 윈도우가 있는 경우, 실행하지 않음.
  const prevWin = await get(windowName);
  if (prevWin !== null) {
    if (prevWin.isDestroyed()) await destroy(windowName);
    else if (!prevWin.isVisible()) await close(windowName);
    else return null;
  }

  const windowOption = {
    ...commonConfig,
    ...config[windowName],
  };
  const { window, loadWindowURL } = await createWindow(
    windowName,
    windowOption,
    windowUtils,
  );

  // 윈도우를 전역 변수에 저장.
  windows.set(windowName, window);
  await loadWindowURL();
  return window;
};

/**
 * 윈도우를 닫은 뒤, BrowserWindow 인스턴스를 제거하는 함수.
 */
export const close = async (windowName: ENV.WindowName) => {
  const win = await get(windowName);
  if (!win || win.isDestroyed()) return;

  const result = callback.run(windowName, "will-close")(windowUtils);
  if (result === false) return;

  win.close();
  win.destroy();
};

/**
 * BrowserWindow 인스턴스를 제거하는 함수.
 */
export const destroy = async (windowName: ENV.WindowName) => {
  windows.delete(windowName);
};

/**
 * 윈도우를 새로고침하는 함수.
 */
export const refresh = async (windowName: ENV.WindowName) => {
  const win = await get(windowName);
  if (!win) return;
  win.reload();
};

/**
 * 해당 윈도우가 준비되었음을 알리는 함수.
 */
export const ready = async (windowName: ENV.WindowName) => {
  const win = await get(windowName);
  if (win === null) return;

  logger.success(`Window "${windowName}" is ready!`);
  const result = callback.run(windowName, "ready")(windowUtils);
  if (result === false) return;
  win.show();
};

/**
 * 윈도우의 이름을 입력하여, BrowserWindow 인스턴스를 반환하는 함수.
 */
export const get = async (windowName: ENV.WindowName) => {
  const win = windows.get(windowName) ?? null;
  return win;
};

/**
 * 윈도우의 이름을 입력하여, 해당 윈도우가 생성되었는지 여부를 반환하는 함수.
 */
export const has = async (windowName: ENV.WindowName) => {
  const win = await get(windowName);
  return win !== null;
};

/**
 * 모든 윈도우의 숨김 상태를 해제하는 함수. (개발자용)
 */
export const showAll = async () => {
  windows.forEach((win) => win.show());
};

/**
 * 입력받은 BrowserWindow 인스턴스의 이름을 반환하는 함수.
 */
export const getName = <
  W extends BrowserWindow | null,
  R extends W extends null ? null : ENV.WindowName,
>(
  window: W,
): R => {
  if (!window) return null as R;
  const windowName = window.accessibleTitle;
  return windowName as R;
};

const windowUtils: WindowUtils = {
  create,
  close,
  destroy,
  refresh,
  ready,
  get,
  has,
  showAll,
  getName,
};
