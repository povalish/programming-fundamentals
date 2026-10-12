import { dirname, relative, sep } from "node:path";

export function parseGoReport(jsonLines, moduleName) {
  const outputs = new Map();
  for (const line of jsonLines.split(/\r?\n/).filter(Boolean)) {
    const event = JSON.parse(line);
    if (event.Action === "fail") {
      throw new Error(`Go benchmark failed: ${event.Package}`);
    }
    if (event.Output) {
      outputs.set(event.Package, (outputs.get(event.Package) ?? "") + event.Output);
    }
  }

  const rows = [];
  for (const [pkg, output] of outputs) {
    for (const line of output.split(/\r?\n/)) {
      const match = /^(Benchmark\S+)\s+\d+\s+(.+)$/.exec(line);
      if (!match) continue;
      const metrics = new Map();
      for (const metric of match[2].matchAll(/([\d.eE+-]+)\s+(\S+)/g)) {
        metrics.set(metric[2], Number(metric[1]));
      }
      const ns = metrics.get("ns/op");
      if (ns === undefined) continue;
      rows.push({
        exercise: pkg.startsWith(`${moduleName}/`) ? pkg.slice(moduleName.length + 1) : pkg,
        language: "Go",
        name: match[1].replace(/^Benchmark_?/, "").replace(/-\d+$/, ""),
        ns,
        bytes: metrics.get("B/op"),
        allocs: metrics.get("allocs/op"),
      });
    }
  }
  return rows;
}

export function parseTsReport(report, root) {
  if (!report.success) throw new Error("TypeScript benchmark run was not successful.");
  const rows = [];
  for (const file of report.testResults) {
    for (const test of file.assertionResults) {
      if (test.status !== "passed") continue;
      for (const benchmark of test.benchmarks ?? []) {
        for (const task of benchmark.tasks) {
          // Stored baselines are not measurements from this run.
          if (task.fromStore) continue;
          const mean = task.latency?.mean;
          if (typeof mean !== "number" || !Number.isFinite(mean) || mean < 0) {
            throw new Error(`Missing/invalid Vitest latency.mean: ${test.fullName} / ${task.name}`);
          }
          rows.push({
            exercise: relative(root, dirname(file.name)).split(sep).join("/"),
            language: "TS",
            name: `${test.title.replace(/^Benchmark:\s*/, "")} / ${task.name}`,
            // Vitest 5 / Tinybench latency is expressed in milliseconds.
            ns: mean * 1_000_000,
            bytes: undefined,
            allocs: undefined,
          });
        }
      }
    }
  }
  return rows;
}

export function formatReport(rows) {
  if (rows.length === 0) return "No benchmarks found.";
  const number = (value) =>
    value === undefined ? "N/A" : value.toLocaleString("en-US", { maximumFractionDigits: 3 });
  const groups = Map.groupBy(rows, (row) => row.exercise);
  const sections = [];
  for (const exercise of [...groups.keys()].sort((a, b) => a.localeCompare(b))) {
    const data = [
      ["Lang", "Benchmark / case", "Mean ns/op", "B/op", "allocs/op"],
      ...groups
        .get(exercise)
        .map((row) => [
          row.language,
          row.name,
          number(row.ns),
          number(row.bytes),
          number(row.allocs),
        ]),
    ];
    const widths = data[0].map((_, i) => Math.max(...data.map((row) => row[i].length)));
    const lines = data.map((row) =>
      row.map((cell, i) => (i < 2 ? cell.padEnd(widths[i]) : cell.padStart(widths[i]))).join("  "),
    );
    sections.push(`${exercise}\n${lines.join("\n")}`);
  }
  return [
    ...sections,
    "Time: ns/op (lower is better); 1,000 ns = 1 µs. Compare only identical inputs and setup.",
    "Go B/op and allocs/op: heap allocations, not peak memory. TS: N/A (not measured by Vitest).",
    "These are microbenchmarks, not a language ranking; JIT, GC and harness overhead affect results.",
  ].join("\n\n");
}
