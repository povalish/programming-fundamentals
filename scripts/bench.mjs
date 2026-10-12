import { execFileSync } from "node:child_process";
import {
  mkdirSync,
  readFileSync,
  readdirSync,
  realpathSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { cpus } from "node:os";
import { join, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { formatReport, parseGoReport, parseTsReport } from "./bench-report.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));

function run(command, args, cwd = root) {
  try {
    return execFileSync(command, args, {
      cwd,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
      timeout: 600_000,
      maxBuffer: 64 * 1024 * 1024,
    });
  } catch (error) {
    if (error.stdout) process.stderr.write(error.stdout);
    if (error.stderr) process.stderr.write(error.stderr);
    throw error;
  }
}

function main() {
  const source = realpathSync(join(root, "src"));
  const directory = realpathSync(resolve(root, process.env.EXERCISE_DIR ?? "src"));
  if (
    (directory !== source && !directory.startsWith(`${source}${sep}`)) ||
    !statSync(directory).isDirectory()
  ) {
    throw new Error("DIR must point to src/ or one of its subdirectories.");
  }

  const output = join(root, ".benchmarks");
  mkdirSync(output, { recursive: true });
  for (const name of ["go.jsonl", "ts.json", "report.txt"]) {
    rmSync(join(output, name), { force: true });
  }

  const versions = [
    `Node ${process.version}`,
    `${process.platform}/${process.arch}`,
    cpus()[0]?.model,
  ];
  const rows = [];
  const hasGo = readdirSync(directory, { recursive: true, withFileTypes: true }).some(
    (entry) => entry.isFile() && entry.name.endsWith(".go"),
  );
  if (hasGo) {
    console.log("Running Go benchmarks...");
    versions.push(run("go", ["version"]).trim());
    const moduleName = run("go", ["list", "-m"]).trim();
    const json = run(
      "go",
      ["test", "-json", "-p=1", "-run=^$", "-bench=.", "-benchmem", "-count=1", "./..."],
      directory,
    );
    writeFileSync(join(output, "go.jsonl"), json);
    rows.push(...parseGoReport(json, moduleName));
  }

  // Run languages and TS files sequentially to avoid competing for CPU.
  console.log("Running TypeScript benchmarks...");
  const tsOutput = join(output, "ts.json");
  run(process.execPath, [
    join(root, "node_modules/vitest/vitest.mjs"),
    "bench",
    "--run",
    "--testNamePattern=Benchmark:",
    "--no-file-parallelism",
    "--reporter=json",
    `--outputFile=${tsOutput}`,
  ]);
  rows.push(...parseTsReport(JSON.parse(readFileSync(tsOutput, "utf8")), root));

  const report = `${versions.filter(Boolean).join(" | ")}\n\n${formatReport(rows)}\n`;
  writeFileSync(join(output, "report.txt"), report);
  console.log(`\n${report}\nRaw results and report: .benchmarks/`);
}

try {
  main();
} catch (error) {
  console.error(`Benchmark report failed: ${error.message}`);
  process.exitCode = 1;
}
