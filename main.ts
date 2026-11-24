import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One original dad joke, told out loud by a father at the dinner table.
// Puns land at the end: rare / raising the steaks / grilled.
const line =
  "I told my son the steak was a rare opportunity. He said, 'Dad, you're really raising the steaks tonight,' and I knew I'd grilled him well.";

if ([...line].length < 1 || [...line].length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${[...line].length}`);
}
if (line.trim() === "") {
  throw new Error("entry must not be only whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), line, "utf8");
