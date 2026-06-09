import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { renderAssets } from "./assets.js";
import { buildClaims } from "./claims.js";
import { exportHtmlFrames } from "./export-html.js";
import { inspectRepo } from "./inspect.js";
import { buildStoryboard, renderScript } from "./storyboard.js";
import { buildDemoCommands, renderDemoCommands, verifyKit } from "./verify.js";

export { buildClaims, buildStoryboard, exportHtmlFrames, inspectRepo, renderScript, verifyKit };

export async function createKit(repoPath, outDir) {
  await mkdir(outDir, { recursive: true });
  const repo = await inspectRepo(repoPath);
  const claims = buildClaims(repo);
  const storyboard = buildStoryboard(repo, claims);
  const verification = verifyKit(repo, claims, storyboard);
  const demoCommands = buildDemoCommands(repo);

  await writeJson(path.join(outDir, "repo.json"), repo);
  await writeJson(path.join(outDir, "claims.json"), claims);
  await writeFile(path.join(outDir, "script.md"), renderScript(storyboard), "utf8");
  await writeJson(path.join(outDir, "storyboard.json"), storyboard);
  await writeJson(path.join(outDir, "verification.json"), verification);
  await writeFile(path.join(outDir, "demo-commands.md"), renderDemoCommands(demoCommands), "utf8");
  await writeFile(path.join(outDir, "assets.md"), renderAssets(repo, storyboard), "utf8");
  return { repo, claims, storyboard, verification, demoCommands };
}

export async function verifyStoryboard(storyboardPath, repoPath) {
  const repo = await inspectRepo(repoPath);
  const claims = buildClaims(repo);
  const storyboard = JSON.parse(await readFile(storyboardPath, "utf8"));
  return verifyKit(repo, claims, storyboard);
}

async function writeJson(target, value) {
  await writeFile(target, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}
