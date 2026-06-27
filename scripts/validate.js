import { access, readFile } from "node:fs/promises";

const required = [
  "README.md",
  "SKILL.md",
  "docs/PRD.md",
  "docs/TASKS.md",
  "docs/ORCHESTRATION.md",
  "docs/RELEASE_CANDIDATE.md",
  "bin/codereel.js",
  "src/index.js",
  "test/codereel.test.js"
];

for (const file of required) {
  await access(file);
}

const pkg = JSON.parse(await readFile("package.json", "utf8"));
if (!pkg.bin?.codereel) throw new Error("package.json must expose codereel bin");
if (!pkg.repository?.url?.includes("github.com/rogerchappel/codereel")) {
  throw new Error("package.json must include codereel repository metadata");
}
if (!pkg.bugs?.url?.includes("github.com/rogerchappel/codereel/issues")) {
  throw new Error("package.json must include codereel issue tracker metadata");
}
if (!pkg.homepage?.includes("github.com/rogerchappel/codereel#readme")) {
  throw new Error("package.json must include codereel README homepage metadata");
}
if (!pkg.scripts?.["package:smoke"]) {
  throw new Error("package.json must include package:smoke");
}
if (!pkg.scripts?.["release:check"]?.includes("package:smoke")) {
  throw new Error("release:check must include package:smoke");
}

const requiredPackEntries = ["bin", "src", "fixtures", "README.md", "LICENSE", "SKILL.md"];
for (const entry of requiredPackEntries) {
  if (!pkg.files?.includes(entry)) {
    throw new Error(`package.json files must include ${entry}`);
  }
}

console.log("codereel validation passed");
