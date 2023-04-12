"use strict";

const builder = require("electron-builder");
const clc = require("cli-color");
const _config = require("../builder.config");

const build = async () => {
  const targets = getTargets();
  const config = getConfig();

  return builder.build({
    targets,
    config,
  });
};

const getTargets = () => {
  const { Platform } = builder;
  const keys = Object.keys(Platform);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const platform = Platform[key].nodeName;

    if (process.platform !== platform) continue;
    return Platform[key].createTarget();
  }

  throw new Error(`Unknown platform: ${process.platform}`);
};

const getConfig = async () => {
  if (typeof _config !== "function") return _config;
  return await _config();
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