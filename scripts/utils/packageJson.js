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

const set = () => {
  update((json) => {
    if (env.stage !== "alpha") return json;
    json.name = `${json.name}-alpha`;
    return json;
  });
};

/** version 뒤의 -staging을 없앱니다. */
const reset = () => {
  update((json) => {
    if (env.stage !== "alpha") return json;
    json.name = json.name.replace("-alpha", "");
    return json;
  });
};

const utility = {
  set,
  reset,
};

module.exports = utility;
