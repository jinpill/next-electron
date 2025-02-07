import { Command } from "commander";
import clc from "cli-color";
import { spawn } from "node:child_process";

export class Program extends Command {
  static CLI_TOOLS = ["npm", "yarn", "pnpm", "next", "webpack"];

  constructor() {
    super();
  }

  handleException = (message) => {
    console.error(clc.red(message));
    this.help();
  };

  static count = (...flags) => {
    let count = 0;

    flags.forEach((flag) => {
      if (flag) count++;
    });

    return count;
  };

  static execute = (command, options = {}) => {
    return new Promise((resolve, reject) => {
      const words = [];
      words.push(...command.split(" "));
      words.push(...Program.parseArgsFromOpts(options));

      let [firstWord, ...restWords] = words;
      if (Program.CLI_TOOLS.includes(firstWord)) {
        const isWin = /^win/.test(process.platform);
        firstWord = isWin ? `${firstWord}.cmd` : firstWord;
      }

      spawn(firstWord, restWords, {
        stdio: "inherit",
        shell: true,
      })
        .on("error", reject)
        .on("close", (code) => {
          if (code === 0) {
            resolve();
          } else {
            const message = "Please check the error message above. ⬆️";
            console.error(clc.red(message));
            reject(new Error(code));
          }
        });
    });
  };

  static parseArgsFromOpts = (options = {}) => {
    return Object.entries(options)
      .map(([key, value]) => {
        const kebabCasedKey = key
          .replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2")
          .toLowerCase();

        if (typeof value === "boolean") {
          if (value) return `--${kebabCasedKey}`;
          else return null;
        } else if (Array.isArray(value)) {
          return value.map((item) => `--${kebabCasedKey} ${item}`).join(" ");
        } else {
          return `--${kebabCasedKey} ${value}`;
        }
      })
      .filter((entry) => entry !== null);
  };
}
