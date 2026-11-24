import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

// Dad Joke Showdown entry: one joke, told out loud at the dinner table.
// The setup is the steak, the turn is "rare" / "raising the steaks",
// and the last word, "grilled", closes the joke the way a dad would.
const setup = "I told my son the steak was a rare opportunity.";
// Delivery: say the punchline straight, with no wink first — pause just
// before "raising the steaks", then land "grilled" deadpan and wait for
// the groan. The groan is the applause.
const punchline =
  "He said, 'Dad, you're really raising the steaks tonight,' and I knew I'd grilled him well.";
const joke = `${setup} ${punchline}`;

function countChars(text: string): number {
  return [...text].length;
}

function isTellable(text: string): boolean {
  const chars = countChars(text);
  if (chars < 1 || chars > 200) return false;
  if (text.trim().length === 0) return false;
  if (!text.includes("steak")) return false;
  return true;
}

function main(): void {
  if (!isTellable(joke)) {
    throw new Error(
      `dad joke must be 1-200 characters and tellable, got ${countChars(joke)}`,
    );
  }
  const targetDir = resolve(process.env.MAKEFUN_OUTPUT_DIR ?? "/output");
  if (!existsSync(targetDir)) {
    mkdirSync(targetDir, { recursive: true });
  }
  const destination = join(targetDir, "entry.txt");
  writeFileSync(destination, joke, { encoding: "utf8", mode: 0o644 });
}

main();
