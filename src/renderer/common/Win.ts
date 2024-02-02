export type Name = "main";

export type ControlAction = {
  type: "open" | "minimize" | "maximize" | "unmaximize" | "close";
  target?: Name;
};

export type ContextBridge = {
  name: Name | "unknown";
  control: (action: ControlAction) => void;
};
