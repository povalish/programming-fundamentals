import { statSync } from "node:fs";
import { relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const root = fileURLToPath(new URL(".", import.meta.url));
const source = resolve(root, "src");
const directory = resolve(root, process.env.EXERCISE_DIR ?? "src");

if (directory !== source && !directory.startsWith(`${source}${sep}`)) {
  throw new Error("DIR must point to src/ or one of its subdirectories.");
}
if (!statSync(directory).isDirectory()) {
  throw new Error(`Not a directory: ${directory}`);
}

const testDirectory = relative(root, directory).split(sep).join("/");

export default defineConfig({
  clearScreen: false,
  test: {
    environment: "node",
    globals: true,
    include: [`${testDirectory}/**/*_test.ts`],
    testNamePattern: /^(?!.*Benchmark:)/,
    benchmark: {
      include: [`${testDirectory}/**/*_test.ts`],
    },
    passWithNoTests: true,
  },
});
