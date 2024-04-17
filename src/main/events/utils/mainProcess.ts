import { app, BrowserWindow, ipcMain } from "electron";
import * as window from "@/utils/window";
import * as Win from "@/common/Win";

type Target = BrowserWindow | Electron.WebContents | Win.Name | null;

export const on = {
  app: (callback: (win: BrowserWindow) => void) => {
    app.on("browser-window-created", (_, win) => {
      callback(win);
    });
  },
  get: <T extends unknown>(
    channel: string,
    callback: (event: Electron.IpcMainEvent, arg: any) => T,
  ) => {
    ipcMain.on(`get:${channel}`, async (event, arg) => {
      const result = await callback(event, arg);
      event.returnValue = result;
    });
  },
  set: <T extends unknown>(
    channel: string,
    callback: (event: Electron.IpcMainInvokeEvent, arg: any) => T,
  ) => {
    ipcMain.handle(`set:${channel}`, callback);
  },
  run: <T extends unknown>(
    channel: string,
    callback: (event: Electron.IpcMainInvokeEvent, arg: any) => T,
  ) => {
    ipcMain.handle(`run:${channel}`, callback);
  },
};

export const send = {
  get: async <T extends unknown>(
    target: Target,
    channel: string,
    arg: any = {},
    timeout?: number,
  ) => {
    return await runSendProcess<T>("get", target, channel, arg, timeout);
  },
  set: async <T extends unknown>(
    target: Target,
    channel: string,
    arg: any = {},
    timeout?: number,
  ) => {
    return await runSendProcess<T>("set", target, channel, arg, timeout);
  },
  run: async <T extends unknown>(
    target: Target,
    channel: string,
    arg: any = {},
    timeout?: number,
  ) => {
    return await runSendProcess<T>("run", target, channel, arg, timeout);
  },
};

const runSendProcess = async <T extends unknown>(
  type: "get" | "set" | "run",
  target: Target,
  channel: string,
  arg: any,
  timeout?: number,
) => {
  if (!target) return;
  const [name, win] = await getTargetData(target);
  if (!name || !(await window.has(name))) return;

  return new Promise<T>((resolve) => {
    const replyListenerChannel = `${type}:${channel}__${name}-reply`;

    const handleReply = (_: Electron.IpcMainEvent, arg: any) => resolve(arg);
    const removeReplyListener = () =>
      ipcMain.removeListener(replyListenerChannel, handleReply);

    // Remove listener after timeout.
    setTimeout(removeReplyListener, timeout ?? 10000);
    ipcMain.once(replyListenerChannel, handleReply);
    win?.webContents.send(`${type}:${channel}`, arg);
  });
};

const getTargetData = async (
  target: BrowserWindow | Electron.WebContents | Win.Name,
) => {
  let name: Win.Name | null;
  let win: BrowserWindow | null;

  if (typeof target === "string") {
    name = target;
    win = await window.get(target);
  } else if (target instanceof BrowserWindow) {
    name = await window.getName(target);
    win = target;
  } else {
    name = await window.getName(target);
    win = name ? await window.get(name) : null;
  }

  return [name, win] as const;
};
