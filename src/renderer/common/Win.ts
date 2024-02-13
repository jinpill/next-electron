export type Name = "main";

export type Config = {
  name: Name | "unknown";
  isClosable: boolean;
  isMinimizable: boolean;
  isMaximizable: boolean;
  isMaximized: boolean;
};

export type ControlAction = {
  type: "open" | "minimize" | "maximize" | "unmaximize" | "close";
  target?: Name;
};

export namespace Event {
  export namespace Set {
    export type Maximized = {
      isMaximized: boolean;
    };
  }
}

export type ContextBridge = {
  getConfig: () => Config;
  control: (action: ControlAction) => Promise<void>;
};
