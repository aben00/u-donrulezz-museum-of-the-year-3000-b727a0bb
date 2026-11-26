// Museum of the Year 3000 — Exhibit: The Remote Control
//
// Writes a single museum label (one line, at most 200 characters) for an
// ordinary object from today, as it would appear in a museum in the year 3000.
// The label is written to `entry.txt` inside MAKEFUN_OUTPUT_DIR.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: a museum label for the TV remote control.
const ENTRY =
  "Remote control (c. 2000). A wand that changed the television from across the room — until it slipped between the sofa cushions, where it remains to this day.";

function main(): void {
  // Self-check the competition constraint: exactly one line, at most 200 chars.
  const lines = ENTRY.split("\n");
  if (lines.length !== 1) {
    throw new Error(`entry must be exactly one line, got ${lines.length}`);
  }
  if (ENTRY.length === 0) {
    throw new Error("entry must not be empty");
  }
  if (ENTRY.length > 200) {
    throw new Error(`entry is ${ENTRY.length} characters, over the 200 limit`);
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, ENTRY + "\n", "utf8");

  // Read back and verify: the file on disk must be exactly the entry line.
  const written = readFileSync(outPath, "utf8");
  if (written !== ENTRY + "\n") {
    throw new Error("verification failed: entry.txt content does not match");
  }
  const writtenLines = written.trimEnd().split("\n");
  if (writtenLines.length !== 1 || writtenLines[0].length > 200) {
    throw new Error("verification failed: entry.txt breaks the one-line / 200-char rule");
  }
  console.log(`Wrote entry.txt (${ENTRY.length} characters)`);
}

main();
