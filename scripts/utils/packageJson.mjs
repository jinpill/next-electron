import fs from "node:fs";
import path from "node:path";
import os from "node:os";

import env from "./env.mjs";
import appOptions from "./appOptions.mjs";

const jsonPath = path.resolve(env.__root, "./package.json");

const update = (callback) => {
  const json = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
  const nextJson = callback(json);
  if (typeof nextJson !== "object") return;

  let contents = JSON.stringify(nextJson, null, 2) + "\n";
  contents = contents.replace(/\n/g, os.EOL);
  fs.writeFileSync(jsonPath, contents, "utf8");
};

export default {
  update,
};
