import type { BrowserWindow, BrowserWindowConstructorOptions } from "electron";
import type * as ENV from "@/common/ENV";

export interface WindowOptions extends BrowserWindowConstructorOptions {
  customOptions?: {
    /** 윈도우의 최근 위치를 그룹과 공유. */
    group?: string;
    /** 부모 윈도우를 설정. */
    parent?: ENV.WindowName;
    /** 개발자 도구 자동 실행을 방지. */
    isPreventDevTools?: boolean;
    /** 윈도우를 화면 중앙에 배치. */
    isCenter?: boolean;
  };
}

export type CallbackType = "will-create" | "ready" | "will-close";

export type CallbackMap = Partial<
  Record<CallbackType, (utils: WindowUtils) => boolean | void>
>;

export type CallbackMaps = Partial<Record<ENV.WindowName, CallbackMap>>;

export interface SizeState {
  width: number;
  height: number;
}

export interface PositionState {
  x: number;
  y: number;
}

export interface State<I> {
  state: I;
}

export type WindowState = State<SizeState & Partial<PositionState>>;

export interface WindowUtils {
  create: (windowName: ENV.WindowName) => Promise<BrowserWindow | null>;
  close: (windowName: ENV.WindowName) => Promise<void>;
  destroy: (windowName: ENV.WindowName) => Promise<void>;
  refresh: (windowName: ENV.WindowName) => Promise<void>;
  ready: (windowName: ENV.WindowName) => Promise<void>;
  get: (windowName: ENV.WindowName) => Promise<BrowserWindow | null>;
  has: (windowName: ENV.WindowName) => Promise<boolean>;
  showAll: () => Promise<void>;
  getName: <
    W extends BrowserWindow | null,
    R extends W extends null ? null : ENV.WindowName,
  >(
    window: W,
  ) => R;
}
