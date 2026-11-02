import assert from "node:assert/strict";
import { resolve } from "node:path";
import { test } from "node:test";
import { formatReport, parseGoReport, parseTsReport } from "./bench-report.mjs";

const root = resolve(".");
const tsReport = (tasks) => ({
  success: true,
  testResults: [
    {
      name: resolve(root, "src/example/example_test.ts"),
      assertionResults: [
        {
          status: "passed",
          title: "Benchmark: example()",
          fullName: "Example Benchmark: example()",
          benchmarks: [{ name: "", tasks }],
        },
        {
          status: "skipped",
          benchmarks: [{ tasks: [{ name: "skipped" }] }],
        },
      ],
    },
  ],
});

const goOutput = (text, pkg = "module/src/example") =>
  JSON.stringify({ Action: "output", Package: pkg, Output: text });

test("Go: subbenchmarks, split output, CPU suffix, zero allocations and units", () => {
  const input = [
    goOutput("goos: darwin\nBenchmark_example/case-10\t"),
    goOutput("1000\t3.855 ns/op\t0 B/op\t0 allocs/op\n"),
    goOutput(
      "Benchmark_other-8 200 1.2e+03 ns/op 64 B/op 2 allocs/op 10 MB/s\n",
      "module/src/other",
    ),
  ].join("\n");
  assert.deepEqual(parseGoReport(input, "module"), [
    {
      exercise: "src/example",
      language: "Go",
      name: "example/case",
      ns: 3.855,
      bytes: 0,
      allocs: 0,
    },
    {
      exercise: "src/other",
      language: "Go",
      name: "other",
      ns: 1200,
      bytes: 64,
      allocs: 2,
    },
  ]);
});

test("TS: converts mean latency from ms to ns, preserves cases, excludes baselines", () => {
  const report = tsReport([
    { name: "fresh array", latency: { mean: 0.000025 } },
    { name: "large", latency: { mean: 0.002 } },
    { name: "baseline", fromStore: true },
  ]);
  assert.deepEqual(parseTsReport(report, root), [
    {
      exercise: "src/example",
      language: "TS",
      name: "example() / fresh array",
      ns: 25,
      bytes: undefined,
      allocs: undefined,
    },
    {
      exercise: "src/example",
      language: "TS",
      name: "example() / large",
      ns: 2000,
      bytes: undefined,
      allocs: undefined,
    },
  ]);
});

test("Failed runs and unsupported TS metrics are not silently reported", () => {
  assert.throws(
    () => parseGoReport('{"Action":"fail","Package":"module/src/example"}', "module"),
    /failed/,
  );
  assert.throws(() => parseTsReport({ success: false }, root), /not successful/);
  assert.throws(() => parseTsReport(tsReport([{ name: "missing latency" }]), root), /latency.mean/);
});

test("Report distinguishes unavailable memory from zero and permits missing languages", () => {
  const go = parseGoReport(
    goOutput("Benchmark_example-10 100 4 ns/op 0 B/op 0 allocs/op\n"),
    "module",
  );
  const ts = parseTsReport(tsReport([{ name: "run", latency: { mean: 0.000025 } }]), root);
  const report = formatReport([...go, ...ts]);
  assert.match(report, /Mean ns\/op/);
  assert.match(report, /Go\s+example\s+4\s+0\s+0/);
  assert.match(report, /TS\s+example\(\) \/ run\s+25\s+N\/A\s+N\/A/);
  assert.match(formatReport(ts), /TS/);
  assert.equal(formatReport([]), "No benchmarks found.");
  assert.deepEqual(parseGoReport("", "module"), []);
  assert.deepEqual(parseTsReport({ success: true, testResults: [] }, root), []);
});
