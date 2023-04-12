/**
 * @type {import('electron-builder').Configuration)}}
 */
module.exports = {
  appId: "my.electron.app",
  files: [
    "main/build/**/*",
    "renderer/build/**/*",
    "renderer/out/**/*",
    "package.json",
  ],
  win: {
    target: "nsis",
  },
  mac: {
    target: "dmg",
  },
};
