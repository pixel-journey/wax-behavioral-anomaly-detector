import type { AnomalyResult } from "./types";

export function exportAnomalyMarkdown(
  account: string,
  result: AnomalyResult
): string {
  const lines = [
    `# Behavioral anomaly — ${account}`,
    "",
    `> Educational · score ${result.anomalyScore} (${result.level})`,
    "",
    `- Sample size: ${result.sampleSize}`,
    `- Mean interval (s): ${result.intervals.meanSeconds.toFixed(1)}`,
    `- Std dev (s): ${result.intervals.stdDevSeconds.toFixed(1)}`,
    `- CV: ${result.intervals.coefficientOfVariation.toFixed(3)}`,
    "",
    "## Flags",
    "",
  ];
  for (const f of result.flags) {
    lines.push(`- [${f.level}] ${f.message}`);
  }
  lines.push("", result.methodologyNote, "");
  return lines.join("\n");
}

export function downloadText(
  filename: string,
  content: string,
  mime = "text/plain;charset=utf-8"
): void {
  if (typeof document === "undefined") return;
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
