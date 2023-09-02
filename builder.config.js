/**
 * @type {import('electron-builder').Configuration)}}
 */
module.exports = {
  appId: "my.electron.app",
  productName: "My App",
  directories: {
    buildResources: "buildSrc",
    output: "build",
  },
  files: [
    "dist/**/*",
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
