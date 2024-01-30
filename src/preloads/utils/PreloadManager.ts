import { ipcRenderer } from "electron";

interface PreloadManagerConfig {
  [channel: string]: (...args: any[]) => any;
}

export interface PreloadManagerConfigs {
  on: PreloadManagerConfig;
  run: PreloadManagerConfig;
  get: PreloadManagerConfig;
  set: PreloadManagerConfig;
}

class PreloadManager<
  Config extends PreloadManagerConfigs = {
    on: {};
    run: {};
    get: {};
    set: {};
  },
> {
  private callbacks: {
    [channel in keyof Config["on"]]?: (
      event: Electron.IpcRendererEvent,
      ...args: any[]
    ) => void;
  } = {};

  public on<Channel extends keyof Config["on"]>(
    channel: Channel,
    callback: Config["on"][Channel],
  ) {
    if (typeof channel !== "string") return;

    const cb = (_event: Electron.IpcRendererEvent, ...args: any[]) => {
      callback(...args);
    };

    this.off(channel);
    this.callbacks[channel] = cb;
    ipcRenderer.on(`on:${channel}`, cb);
  }

  public off<Channel extends keyof Config["on"]>(channel: Channel) {
    if (typeof channel !== "string") return;

    const callback = this.callbacks[channel];
    if (!callback) return;

    ipcRenderer.off(`on:${channel}`, callback);
    delete this.callbacks[channel];
  }

  public run<Channel extends keyof Config["run"]>(
    channel: Channel,
    ...args: Parameters<Config["run"][Channel]>
  ) {
    if (typeof channel !== "string") return;
    ipcRenderer.send(`run:${channel}`, ...args);
  }

  public runSync<Channel extends keyof Config["run"]>(
    channel: Channel,
    ...args: Parameters<Config["run"][Channel]>
  ): ReturnType<Config["run"][Channel]> | null {
    if (typeof channel !== "string") return null;
    return ipcRenderer.sendSync(`run:${channel}`, ...args);
  }

  public get<Channel extends keyof Config["get"]>(
    channel: Channel,
    ...args: Parameters<Config["get"][Channel]>
  ): ReturnType<Config["get"][Channel]> | null {
    if (typeof channel !== "string") return null;
    return ipcRenderer.sendSync(`get:${channel}`, ...args);
  }

  public set<Channel extends keyof Config["set"]>(
    channel: Channel,
    ...args: Parameters<Config["set"][Channel]>
  ) {
    if (typeof channel !== "string") return;
    ipcRenderer.sendSync(`set:${channel}`, ...args);
  }
}

export default PreloadManager;
