// ref: https://www.electron.build/configuration/configuration
export default async (env) => {
  /**
   * @type {import('electron-builder').Configuration)}
   */
  const config = {
    appId: env.config.appId,
    productName: env.config.productName,
    artifactName: "${name}-${version}-${arch}.${ext}",
    directories: {
      output: "build",
      buildResources: "buildSrc",
    },
    asar: true,
    compression: "store",
    files: [
      "dist/**/*",
      "src/renderer/build/**/*",
      "src/renderer/out/**/*",
      ".app.config.json",
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
