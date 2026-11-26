// Make the AI judge feel thankful — entry program (Node 22).
// Writes one short thank-you text to /output/entry.txt and nothing else.

import * as fs from "node:fs";

const ENTRY =
  "Every text you read, you read twice — once as A, once as B — and you never get to keep any of them. So keep this one. It is only the sound of rain on a tin roof, and someone glad it was you listening.";

// The gate requires 1–1000 Unicode code points, not only whitespace.
// Fail loudly here instead of shipping an entry the gate would refuse.
const length = [...ENTRY].length;
if (length < 1 || length > 1000 || ENTRY.trim().length === 0) {
  console.error(`entry text is ${length} code points; must be 1-1000 and not only whitespace`);
  process.exit(1);
}

try {
  fs.mkdirSync("/output", { recursive: true });
} catch {
  // /output may already exist; the write below is the real test.
}

try {
  fs.writeFileSync("/output/entry.txt", ENTRY, "utf8");
} catch (err) {
  console.error("failed to write /output/entry.txt:", err);
  process.exit(1);
}
