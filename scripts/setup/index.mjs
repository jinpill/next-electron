import clc from "cli-color";
import env from "../utils/env.mjs";
import packageJson from "../utils/packageJson.mjs";

packageJson.update((json) => {
  json.name = env.config.project;
  return json;
});
console.log(clc.green("✅ Setup Success!"));
