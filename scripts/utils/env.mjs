import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __root = path.resolve(__dirname, "../../");

const config = (() => {
  const appConfigPath = path.resolve(__root, "./.app.config.json");
  const appConfig = JSON.parse(fs.readFileSync(appConfigPath, "utf8"));
  return appConfig;
})();

export default {
  __root,
  config,
};
