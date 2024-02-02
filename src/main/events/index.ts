import * as app from "./app";
import * as win from "./win";

export const register = async () => {
  await app.register();
  await win.register();
};
