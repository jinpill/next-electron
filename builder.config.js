/**
 * @type {import('electron-builder').Configuration)}}
 */
module.exports = {
  appId: "my.electron.app",
  productName: "My App",
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
