import { ipcRenderer } from "electron";

export const on = {
  get: async (
    channel: string,
    callback: (
      event: Electron.IpcRendererEvent,
      arg: Record<string, any>,
    ) => any | Promise<any>,
  ) => {
    ipcRenderer.on(`get:${channel}`, async (event, arg) => {
      const name = send.get<string>("window-config");
      const result = await callback(event, arg);
      ipcRenderer.send(`get:${channel}__${name}-reply`, result);
    });
  },
  set: async (
    channel: string,
    callback: (
      event: Electron.IpcRendererEvent,
      arg: Record<string, any>,
    ) => void | Promise<void>,
  ) => {
    ipcRenderer.on(`set:${channel}`, callback);
  },
  run: async (
    channel: string,
    callback: (
      event: Electron.IpcRendererEvent,
      arg: Record<string, any>,
    ) => void | Promise<void>,
  ) => {
    ipcRenderer.on(`run:${channel}`, callback);
  },
};

export const send = {
  get: <T extends unknown>(channel: string, arg: Record<string, any> = {}) => {
    const result = ipcRenderer.sendSync(`get:${channel}`, arg);
    return result as T;
  },
  set: async (channel: string, arg: Record<string, any>) => {
    await ipcRenderer.invoke(`set:${channel}`, arg);
  },
  run: async (channel: string, arg: Record<string, any> = {}) => {
    await ipcRenderer.invoke(`set:${channel}`, arg);
  },
};
