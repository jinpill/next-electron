const path = require("path");
const env = require("./utils/env");

module.exports = {
  target: "electron-main",
  entry: path.resolve(env.__src, "./main/index.ts"),
  mode: "development",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      "@/common": path.resolve(env.__src, "./renderer/common"),
      "@": path.resolve(env.__src, "./main"),
    },
  },
  output: {
    filename: "index.bundle.js",
    path: path.resolve(env.__root, "./dist/main"),
  },
  externals: {
    "@metamorp/engine": "commonjs @metamorp/engine",
  },
};
