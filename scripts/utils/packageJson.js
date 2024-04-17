const fs = require("node:fs");
const path = require("node:path");
const os = require("node:os");

const env = require("./env");
const jsonPath = path.resolve(env.__root, "./package.json");

const get = () => {
  const json = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
  return json;
};

const update = (callback) => {
  const json = get();
  const nextJson = callback(json);
  if (typeof nextJson !== "object") return;

  let contents = JSON.stringify(nextJson, null, 2) + "\n";
  contents = contents.replace(/\n/g, os.EOL);
  fs.writeFileSync(jsonPath, contents, "utf8");
};

const utility = {
  get,
  update,
};

module.exports = utility;
