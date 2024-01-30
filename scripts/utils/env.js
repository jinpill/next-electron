const path = require("path");

const __root = path.resolve(__dirname, "../../");

const stage = (() => {
  const jsonPath = path.resolve(__root, "./package.json");
  const version = require(jsonPath).version;
  const postfix = version.split("-")[1] ?? "";

  if (postfix.includes("alpha")) return "alpha";
  if (postfix.includes("beta")) return "beta";
  return "stable";
})();

const env = {
  __root,
  stage,
};

module.exports = env;
