import type { BrowserWindow, BrowserWindowConstructorOptions } from "electron";

export interface WindowOptions extends BrowserWindowConstructorOptions {
  customOptions?: {
    /** 윈도우의 최근 위치를 그룹과 공유. */
    group?: string;
    /** 개발자 도구 자동 실행을 방지. */
    isPreventDevTools?: boolean;
    /** 부모 윈도우를 설정. */
    parent?: WindowName;
  };
}

export type WindowName = "main";

export type CallbackType = "will-create" | "ready" | "will-close";

export type CallbackMap = Partial<
  Record<CallbackType, (utils: WindowUtils) => boolean | void>
>;

export type CallbackMaps = Partial<Record<WindowName, CallbackMap>>;

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
  create: (windowName: WindowName) => Promise<BrowserWindow | null>;
  close: (windowName: WindowName) => void;
  destroy: (windowName: WindowName) => void;
  refresh: (windowName: WindowName) => void;
  ready: (windowName: WindowName) => void;
  get: (windowName: WindowName) => BrowserWindow | null;
  showAll: () => void;
}
