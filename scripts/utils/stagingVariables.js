const fs = require("fs");
const path = require("path");
const childProcess = require("child_process");

const env = require("./env");
const jsonPath = path.resolve(env.__root, "./.staging-vars.json");

const create = () => {
  if (!env.isStaging) return;

  const branch = childProcess.execSync("git rev-parse --abbrev-ref HEAD");
  const commit = childProcess.execSync("git rev-parse HEAD");

  // json에 포함시킬 내용을 정의.
  const vars = {
    branch: branch.toString().trim(),
    commit: commit.toString().trim(),
  };

  const contents = JSON.stringify(vars, null, 2) + "\n";
  fs.writeFileSync(jsonPath, contents, "utf8");
};

const remove = () => {
  if (!env.isStaging) return;
  fs.rmSync(jsonPath);
};

const utility = {
  create,
  remove,
};

module.exports = utility;
