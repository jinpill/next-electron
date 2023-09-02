// ref: https://www.electron.build/configuration/configuration

module.exports = async (env) => {
  const compression = env.isStaging ? "store" : "maximum";

  /**
   * @type {import('electron-builder').Configuration)}}
   */
  const config = {
    appId: "my.electron.app",
    productName: "My App",
    artifactName: "${name}-${version}-${arch}.${ext}",
    directories: {
      buildResources: "buildSrc",
      output: "build",
    },
    asar: true,
    compression: compression,
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
    nsis: {
      uninstallDisplayName: "${productName} ${version}",
    },
    mac: {
      target: "dmg",
    },
    dmg: {
      title: "${productName} ${version}",
    },
  };

  return config;
};
