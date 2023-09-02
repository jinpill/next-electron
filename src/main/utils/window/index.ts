import logger from "@/utils/logger";

import windows from "./windows";
import config, { commonConfig } from "./config";
import createWindow from "./features/createWindow";

import type { WindowName, WindowUtils } from "./types";

/**
 * 윈도우 이름을 입력하여, 미리 정의된 옵션으로 윈도우를 생성하는 함수.
 */
export const create = async (windowName: WindowName) => {
  // 이미 생성된 윈도우가 있는 경우, 실행하지 않음.
  if (get(windowName) !== null) return null;

  const windowOption = {
    ...commonConfig,
    ...config[windowName],
  };
  const win = await createWindow(windowName, windowOption, windowUtils);

  // 윈도우를 전역 변수에 저장.
  windows.set(windowName, win);
  return win;
};

/**
 * 윈도우를 닫은 뒤, BrowserWindow 인스턴스를 제거하는 함수.
 */
export const close = (windowName: WindowName) => {
  const win = get(windowName);
  if (!win) return;

  win.close();
  win.destroy();
};

/**
 * BrowserWindow 인스턴스를 제거하는 함수.
 */
export const destroy = (windowName: WindowName) => {
  windows.delete(windowName);
};

/**
 * 윈도우를 새로고침하는 함수.
 */
export const refresh = (windowName: WindowName) => {
  const win = get(windowName);
  if (!win) return;
  win.reload();
};

/**
 * 해당 윈도우가 준비되었음을 알리는 함수.
 */
export const ready = (windowName: WindowName) => {
  const win = get(windowName);
  if (win === null) return;

  logger.info(`Window "${windowName}" is`, "ready!");
  win.show();
};

/**
 * 윈도우의 이름을 입력하여, BrowserWindow 인스턴스를 반환하는 함수.
 */
export const get = (windowName: WindowName) => {
  const win = windows.get(windowName) ?? null;
  return win;
};

/** 모든 윈도우의 숨김 상태를 해제하는 함수. (개발자용) */
export const showAll = () => {
  windows.forEach((win) => win.show());
};

const windowUtils: WindowUtils = {
  create,
  close,
  destroy,
  refresh,
  ready,
  get,
  showAll,
};

export default windowUtils;
