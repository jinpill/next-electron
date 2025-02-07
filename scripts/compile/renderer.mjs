import { Program } from "../utils/Program.mjs";

const bootstrap = async () => {
  const program = new Program();
  program.option("-t, --type", "Check only the types", false).parse();
  const options = program.opts();

  if (options.type) {
    await Program.execute("tsc --noEmit -p src/renderer/tsconfig.json");
  } else {
    await Program.execute("next build src/renderer");
  }

  await Program.execute("eslint src/renderer", {
    config: "src/renderer/eslint.config.mjs",
  });
};

bootstrap();
