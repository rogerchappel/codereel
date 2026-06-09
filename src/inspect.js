import path from "node:path";
import { listFiles, readTextIfExists } from "./fs-utils.js";

export async function inspectRepo(repoPath) {
  const root = path.resolve(repoPath);
  const files = await listFiles(root, 3);
  const readmePath = files.find((file) => /^readme\.md$/i.test(file));
  const packageText = await readTextIfExists(path.join(root, "package.json"));
  const readme = readmePath ? await readTextIfExists(path.join(root, readmePath)) : "";
  const releaseNotes = await readTextIfExists(path.join(root, "docs", "RELEASE_CANDIDATE.md"));
  const packageJson = parsePackage(packageText);

  const scripts = Object.keys(packageJson.scripts ?? {});
  const bins = packageJson.bin
    ? typeof packageJson.bin === "string"
      ? [packageJson.name].filter(Boolean)
      : Object.keys(packageJson.bin)
    : [];

  return {
    root,
    name: packageJson.name ?? path.basename(root),
    description: packageJson.description ?? firstUsefulLine(readme) ?? "",
    readmePath,
    hasReadme: Boolean(readmePath),
    scripts,
    bins,
    tests: files.filter((file) => /(^test\/|\.test\.)/.test(file)),
    docs: files.filter((file) => file.startsWith("docs/")),
    examples: files.filter((file) => file.startsWith("examples/") || file.startsWith("fixtures/")),
    releaseNotes: Boolean(releaseNotes.trim()),
    packageManager: files.includes("package-lock.json") ? "npm" : "unknown",
    files
  };
}

function parsePackage(text) {
  if (!text.trim()) return {};
  try {
    return JSON.parse(text);
  } catch {
    return {};
  }
}

function firstUsefulLine(markdown) {
  return markdown
    .split(/\r?\n/)
    .map((line) => line.replace(/^#+\s*/, "").trim())
    .find((line) => line && !line.startsWith("["));
}
