"use strict";

const fs = require("fs");
const path = require("path");
const clc = require("cli-color");

const env = require("../utils/env");
const packageJson = require("../utils/packageJson");

const appConfigPath = path.resolve(env.__root, "./.app.config.json");
const appConfig = JSON.parse(fs.readFileSync(appConfigPath, "utf8"));

packageJson.update((json) => {
  json.name = appConfig.project;
  json.scripts["dev:render"] = `next dev src/renderer -p ${appConfig.port}`;
  return json;
});
console.log(clc.green("✅ Setup Success!"));
