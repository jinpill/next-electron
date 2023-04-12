"use strict";

const builder = require("electron-builder");
const clc = require("cli-color");
const _config = require("../builder.config");

const build = async () => {
  const targets = builder.Platform.MAC.createTarget();
  const config = typeof _config === "function" ? await _config() : _config;

  return builder.build({
    targets,
    config,
  });
};

console.log(clc.blue("🚀 Build Started!"));
console.time(clc.yellow("⏰ Build Time:"));
build()
  .then(() => {
    console.log(clc.green("✅ Build Success!"));
  })
  .catch((err) => {
    console.log(clc.red("🚨 Build Failed!"));
    console.error(err);
  })
  .finally(() => {
    console.timeEnd(clc.yellow("⏰ Build Time:"));
  });
