import { readdir } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import path from "node:path";

const roots = ["bin", "src"];
const files = [];

for (const root of roots) {
  await collectJavaScript(root);
}

for (const file of files) {
  const result = spawnSync(process.execPath, ["--check", file], { stdio: "inherit" });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

console.log(`codereel build check passed for ${files.length} files`);

async function collectJavaScript(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const target = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await collectJavaScript(target);
    } else if (entry.isFile() && entry.name.endsWith(".js")) {
      files.push(target);
    }
  }
}
