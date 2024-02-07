import { BrowserWindow, ipcMain } from "electron";
import * as window from "@/utils/window";
import * as Win from "@/common/Win";

export const on = {
  get: (
    channel: string,
    callback: (event: Electron.IpcMainEvent, arg: any) => void | Promise<void>,
  ) => {
    ipcMain.on(`get:${channel}`, async (event, arg) => {
      const result = await callback(event, arg);
      event.returnValue = result;
    });
  },
  set: (
    channel: string,
    callback: (
      event: Electron.IpcMainInvokeEvent,
      arg: any,
    ) => void | Promise<void>,
  ) => {
    ipcMain.handle(`set:${channel}`, callback);
  },
  run: (
    channel: string,
    callback: (
      event: Electron.IpcMainInvokeEvent,
      arg: any,
    ) => void | Promise<void>,
  ) => {
    ipcMain.handle(`run:${channel}`, callback);
  },
};

export const send = {
  get: async <T = unknown>(
    target: BrowserWindow | Electron.WebContents | Win.Name | null,
    channel: string,
    arg: Record<string, any> = {},
  ) => {
    if (!target) return;
    const { win, name } = await getTargetData(target);

    return new Promise<T>((resolve) => {
      ipcMain.once(`get:${channel}__${name}-reply`, (_, arg) => resolve(arg));
      win.webContents.send(`get:${channel}`, arg);
    });
  },
  set: async (
    target: BrowserWindow | Electron.WebContents | Win.Name | null,
    channel: string,
    arg: Record<string, any> = {},
  ) => {
    if (!target) return;
    const { win } = await getTargetData(target);
    win.webContents.send(`set:${channel}`, arg);
  },
  run: async (
    target: BrowserWindow | Electron.WebContents | Win.Name | null,
    channel: string,
    arg: Record<string, any> = {},
  ) => {
    if (!target) return;
    const { win } = await getTargetData(target);
    win.webContents.send(`run:${channel}`, arg);
  },
};

const getTargetData = async (
  target: BrowserWindow | Electron.WebContents | Win.Name,
) => {
  let name: Win.Name;
  let win: BrowserWindow;

  if (typeof target === "string") {
    name = target;
    win = (await window.get(target))!;
  } else if (target instanceof BrowserWindow) {
    name = (await window.getName(target))!;
    win = target;
  } else {
    name = (await window.getName(target))!;
    win = (await window.get(name))!;
  }

  return {
    name,
    win,
  };
};
