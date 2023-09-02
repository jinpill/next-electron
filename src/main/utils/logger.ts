import clc from "cli-color";

type Color =
  | "white"
  | "green"
  | "yellow"
  | "red"
  | "black"
  | "blue"
  | "cyan"
  | "magenta";

type Logger = "log" | "warn" | "error";

const getLogger = (symbol: string, color: Color, logger: Logger) => {
  return (message: any, details?: any) => {
    let text = clc[color](`${symbol} ${message}`);
    if (typeof details !== "undefined") text += clc.black(`: ${details}`);
    console[logger](text);
  };
};

const log = getLogger("📋", "white", "log");
const info = getLogger("💡", "green", "log");
const warn = getLogger("🚸", "yellow", "warn");
const error = getLogger("🚨", "red", "error");

export default {
  get: getLogger,
  log,
  info,
  warn,
  error,
};
