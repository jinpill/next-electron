import { Program } from "../utils/Program.mjs";

const bootstrap = async () => {
  const program = new Program();
  program.option("-t, --type", "Check only the types", false).parse();
  const options = program.opts();

  if (options.type) {
    await Program.execute("tsc --noEmit -p src/renderer/tsconfig.json");
    await Program.execute("eslint src/renderer", {
      config: "src/renderer/eslint.config.mjs",
    });
  } else {
    await Program.execute("next build src/renderer");
  }
};

bootstrap();
