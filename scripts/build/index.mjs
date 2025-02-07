import { Program } from "../utils/Program.mjs";

const bootstrap = async () => {
  // initialize project
  await Program.execute("pnpm run ci");
  await Program.execute("rm -rf build");

  // compile sources
  await Program.execute("pnpm run compile --renderer");
  await Program.execute("pnpm run compile --preloads");
  await Program.execute("pnpm run compile --main");

  // build project
  await Program.execute("node scripts/build/build.mjs");
};

bootstrap();
