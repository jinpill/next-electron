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
    "src/renderer/build/**/*",
    "src/renderer/out/**/*",
    ".staging-vars.json",
    "package.json",
  ],
  win: {
    target: "nsis",
  },
  mac: {
    target: "dmg",
  },
};
