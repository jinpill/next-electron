const path = require("path");

const __root = path.resolve(__dirname, "../../");
const isStaging = process.env.IS_STAGING === "true";

const env = {
  __root,
  isStaging,
};

module.exports = env;
