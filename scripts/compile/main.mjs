import { Program } from "../utils/Program.mjs";

const bootstrap = async () => {
  const program = new Program();
  program.option("-t, --type", "Check only the types", false).parse();
  const options = program.opts();

  if (options.type) {
    await Program.execute("tsc --noEmit -p src/main/tsconfig.json");
  } else {
    await Program.execute("rm -rf dist/main");
    await Program.execute("webpack --config webpack/main.config.js");
  }
};

bootstrap();
