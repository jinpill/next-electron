/**
 * @type {import('electron-builder').Configuration)}}
 */
module.exports = {
  productName: "My App",
  appId: "my.electron.app",
  files: [
    "main/build/**/*",
    "renderer/build/**/*",
    "renderer/out/**/*",
    "package.json",
  ],
  mac: {
    target: "dmg",
  },
};
