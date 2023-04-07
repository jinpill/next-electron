import {
  screen,
  BrowserWindow,
  BrowserWindowConstructorOptions,
  Display
} from 'electron';
import Store from 'electron-store';
import env from './env';

interface WindowState {
  width: number;
  height: number;
  x?: number;
  y?: number;
}

const windows = new Map<string, BrowserWindow>();

export const create = (windowName: string, options: BrowserWindowConstructorOptions) => {
  const key = "window-state";
  const name = `${key}-${windowName}`

  const store = new Store({ name });
  const defaultSize: WindowState = {
    width: options.width ?? 800,
    height: options.height ?? 600,
  };

  // 윈도우의 현재 크기와 위치를 반환.
  const getCurrentState = () => {
    const [x, y] = win.getPosition();
    const [width, height] = win.getSize();

    return {
      x,
      y,
      width,
      height,
    };
  };

  // 윈도우의 위치가 화면 안에 표시되는지 확인.
  const windowWithinBounds = (windowState: WindowState, bounds: Display['bounds']) => {
    if (typeof windowState.x !== 'number') return false;
    if (typeof windowState.y !== 'number') return false;
    if (windowState.x < bounds.x) return false
    if (windowState.y < bounds.y) return false
    if (windowState.x + windowState.width > bounds.x + bounds.width) return false
    if (windowState.y + windowState.height > bounds.y + bounds.height) return false
    return true
  };

  // 윈도우의 기본 상태를 얻음.
  const getDefaultState = () => {
    const bounds = screen.getPrimaryDisplay().bounds;
    return Object.assign({}, defaultSize, {
      x: (bounds.width - defaultSize.width) / 2,
      y: (bounds.height - defaultSize.height) / 2,
    });
  };

  // 윈도우의 이전 위치가 화면 안에 표시되도록 함.
  const ensureVisibleOnSomeDisplay = () => {
    const windowState = store.get(key, defaultSize) as WindowState;

    const visible = screen.getAllDisplays().some(display => {
      const withinBounds = windowWithinBounds(windowState, display.bounds);
      return withinBounds
    });

    if (!visible) return getDefaultState();
    return windowState;
  };

  // 윈도우의 위치를 저장.
  const saveState = () => {
    if (!win.isMinimized() && !win.isMaximized()) {
      Object.assign(state, getCurrentState());
    }
    store.set(key, state);
  };

  // 윈도우의 크기와 위치를 설정.
  const state = ensureVisibleOnSomeDisplay();

  // 윈도우를 생성.
  const win = new BrowserWindow({
    ...state,
    ...options,
    webPreferences: {
      nodeIntegration: true,
      ...options.webPreferences,
    },
  });

  // 윈도우를 닫으면 크기와 위치를 저장.
  win.on('close', saveState);

  if (env.mode === 'development') {
    win.loadURL(`http://localhost:8888/${windowName}`);
    win.webContents.openDevTools();
  } else {
    win.loadFile(`./renderer/out/${windowName}.html`);
  }

  windows.set(windowName, win);
  return win;
}

export const get = (windowName: string) => {
  const win = windows.get(windowName) ?? null;
  return win;
}

export default {
  create,
}