import { access, readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";

export async function exists(target) {
  try {
    await access(target);
    return true;
  } catch {
    return false;
  }
}

export async function readTextIfExists(target) {
  if (!(await exists(target))) return "";
  return readFile(target, "utf8");
}

export async function listFiles(root, maxDepth = 2) {
  const output = [];

  async function walk(current, depth) {
    if (depth > maxDepth) return;
    const entries = await readdir(current, { withFileTypes: true }).catch(() => []);
    for (const entry of entries) {
      if (entry.name === "node_modules" || entry.name === ".git") continue;
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) {
        await walk(full, depth + 1);
      } else if (entry.isFile()) {
        const info = await stat(full);
        if (info.size <= 256_000) output.push(path.relative(root, full));
      }
    }
  }

  await walk(root, 0);
  return output.sort();
}
