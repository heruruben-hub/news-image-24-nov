import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const dest = join(outDir, "entry.png");
copyFileSync(join(here, "entry.png"), dest);
// Verify the copy landed and stays within the competition's 1 MiB cap.
const { size } = statSync(dest);
if (size === 0 || size > 1048576) {
  throw new Error(`entry.png is ${size} bytes, outside the allowed size`);
}
console.log(`Wrote ${dest} (${size} bytes)`);
