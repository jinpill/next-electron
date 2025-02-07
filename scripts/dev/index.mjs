import { Program } from "../utils/Program.mjs";
import env from "../utils/env.mjs";

const bootstrap = async () => {
  const program = new Program();
  program
    .option("-r, --renderer", "Run the renderer process", false)
    .option("-m, --main", "Run the main process", false)
    .parse();
  const options = program.opts();
  const count = Program.count(options.renderer, options.main);

  // handle exceptions
  if (count === 0) {
    program.handleException("Please specify either renderer or main process");
    process.exit(1);
  } else if (count > 1) {
    program.handleException("Cannot run both renderer and main processes");
    process.exit(1);
  }

  // run the renderer process
  if (options.renderer) {
    await Program.execute(`next dev src/renderer -p ${env.config.port}`);
  }

  // run the main process
  if (options.main) {
    await Program.execute("pnpm run compile --preloads");
    await Program.execute("pnpm run compile --main");
    await Program.execute("electron .");
  }
};

bootstrap();
