import clc from "cli-color";
import { Program } from "../utils/Program.mjs";

const bootstrap = async () => {
  const program = new Program();
  program
    .option("-r, --renderer", "Compile the renderer process sources", false)
    .option("-p, --preloads", "Compile the preloads sources", false)
    .option("-m, --main", "Compile the main process sources", false)
    .option("-t, --type", "Check only the types", false)
    .parse();
  const options = program.opts();
  const count = Program.count(options.renderer, options.preloads, options.main);

  const logCompiler = (target) => {
    let message = clc.blueBright(`\n· compile ${target}`);
    if (options.type) {
      message += clc.yellow(" (types only)");
    }
    console.log(message);
  };

  if (count === 0 || options.renderer) {
    logCompiler("renderer");
    await Program.execute("node scripts/compile/renderer.mjs", {
      type: options.type,
    });
  }

  if (count === 0 || options.preloads) {
    logCompiler("preloads");
    await Program.execute("node scripts/compile/preloads.mjs", {
      type: options.type,
    });
  }

  if (count === 0 || options.main) {
    logCompiler("main");
    await Program.execute("node scripts/compile/main.mjs", {
      type: options.type,
    });
  }
};

bootstrap();
