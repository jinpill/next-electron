import { Program } from "./utils/Program.mjs";

const bootstrap = async () => {
  const program = new Program();
  program
    .option("-r, --renderer", "Run the renderer process", false)
    .option("-m, --main", "Run the main process", false)
    .parse();
  const options = program.opts();

  // handle exceptions
  if (!options.renderer && !options.main) {
    program.handleException("Please specify either renderer or main process");
    process.exit(1);
  } else if (options.renderer && options.main) {
    program.handleException("Cannot run both renderer and main processes");
    process.exit(1);
  }

  // run the renderer process
  if (options.renderer) {
    await Program.execute("next dev src/renderer -p 8888");
  }

  // run the main process
  if (options.main) {
    await Program.execute("pnpm run compile --preloads");
    await Program.execute("pnpm run compile --main");
    await Program.execute("electron .");
  }
};

bootstrap();
