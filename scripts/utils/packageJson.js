const fs = require("fs");
const path = require("path");

const env = require("./env");
const jsonPath = path.resolve(env.__root, "./package.json");

const update = (callback) => {
  const json = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
  const nextJson = callback(json);
  if (typeof nextJson !== "object") return;

  const contents = JSON.stringify(nextJson, null, 2) + "\n";
  fs.writeFileSync(jsonPath, contents, "utf8");
};

/** staging 버전 빌드인 경우, version 뒤에 -staging을 붙입니다. */
const set = () => {
  update((json) => {
    json.version = json.version.split("-")[0];
    if (env.isStaging) json.version += "-staging";
    return json;
  });
};

/** version 뒤의 -staging을 없앱니다. */
const reset = () => {
  update((json) => {
    if (!env.isStaging) return;
    json.version = json.version.split("-")[0];
    return json;
  });
};

const utility = {
  set,
  reset,
};

module.exports = utility;
