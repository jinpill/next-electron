export type WindowName = "main";

export type Language = "en" | "ko";

export type OS = "windows" | "mac" | "unknown";

export type Mode = "packaged" | "development";

export type Stage = "alpha" | "beta" | "stable";

export type AlphaVars = {
  branch: string;
  commit: string;
};

export type Version = {
  app: string;
  node: string;
  electron: string;
  chrome: string;
};

export type ContextBridge = {
  window: WindowName | "unknown";
  language: Language;
  os: OS;
  mode: Mode;
  stage: Stage;
  version: Version;
  alphaVars?: AlphaVars;
  isProduction: boolean;
  isDevelopment: boolean;
};
