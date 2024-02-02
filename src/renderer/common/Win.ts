export type Name = "main";

export type Config = {
  name: Name | "unknown";
  isClosable: boolean;
  isMinimizable: boolean;
  isMaximizable: boolean;
};

export type ControlAction = {
  type: "open" | "minimize" | "maximize" | "unmaximize" | "close";
  target?: Name;
};

export type ContextBridge = {
  config: Config;
  control: (action: ControlAction) => void;
};
