export type Language = "en" | "ko";

export type Mode = "production" | "staging" | "development";

export type StagingVars = {
  branch: string;
  commit: string;
};

export type OS = "mac" | "windows" | "unknown";

export type Versions = {
  app: string;
  node: string;
  electron: string;
  chrome: string;
};

type ENV = {
  language: Language;
  mode: Mode;
  os: OS;
  stagingVars?: StagingVars;
  versions: Versions;
};

export default ENV;
