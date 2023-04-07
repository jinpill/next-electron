import { app } from 'electron';

const { env, platform } = process;
let initialized = false;

export type Mode = 'production' | 'test' | 'development';
export type OS = 'mac' | 'windows' | 'unknown';

export const mode: Mode = (() => {
  if (app.isPackaged) return "production";
  if (env.TEST === "true") return "test";
  return "development";
})()

export const os: OS = (() => {
  if (platform === 'darwin') return 'mac';
  if (platform === 'win32') return 'windows';
  return 'unknown';
})()

export const initialize = () => {
  if (initialized) return
  initialized = true;

  if (mode === 'production') return true;
  const userDataPath = `${app.getPath('userData')} (${mode})`;
  app.setPath('userData', userDataPath);
}

export default {
  mode,
  os,
  initialize,
};
