#!/usr/bin/env node
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { buildClaims, buildStoryboard, createKit, exportHtmlFrames, inspectRepo, renderScript, verifyStoryboard } from "../src/index.js";

const [command, ...args] = process.argv.slice(2);

try {
  await main(command, args);
} catch (error) {
  console.error(error.message);
  process.exit(1);
}

async function main(command, args) {
  if (!command || command === "--help" || command === "help") {
    printHelp();
    return;
  }

  const repo = args[0] ?? ".";
  const out = valueAfter(args, "--out") ?? ".codereel";

  if (command === "inspect") {
    await mkdir(out, { recursive: true });
    await writeJson(path.join(out, "repo.json"), await inspectRepo(repo));
    return;
  }

  if (command === "script" || command === "storyboard") {
    await mkdir(out, { recursive: true });
    const facts = await inspectRepo(repo);
    const claims = buildClaims(facts);
    const storyboard = buildStoryboard(facts, claims);
    await writeJson(path.join(out, "claims.json"), claims);
    await writeJson(path.join(out, "storyboard.json"), storyboard);
    await writeFile(path.join(out, "script.md"), renderScript(storyboard), "utf8");
    return;
  }

  if (command === "kit") {
    await createKit(repo, out);
    return;
  }

  if (command === "verify") {
    const storyboardPath = args[0];
    const repoPath = valueAfter(args, "--repo") ?? ".";
    if (!storyboardPath) throw new Error("Usage: codereel verify <storyboard.json> --repo <repo>");
    console.log(JSON.stringify(await verifyStoryboard(storyboardPath, repoPath), null, 2));
    return;
  }

  if (command === "export") {
    const storyboardPath = args[0];
    if (!storyboardPath) throw new Error("Usage: codereel export <storyboard.json> --out <frames>");
    const storyboard = JSON.parse(await readFile(storyboardPath, "utf8"));
    await exportHtmlFrames(storyboard, out);
    return;
  }

  throw new Error(`Unknown command: ${command}`);
}

function valueAfter(args, flag) {
  const index = args.indexOf(flag);
  return index >= 0 ? args[index + 1] : undefined;
}

async function writeJson(target, value) {
  await writeFile(target, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function printHelp() {
  console.log(`codereel

Usage:
  codereel inspect <repo> --out .codereel
  codereel script <repo> --out .codereel
  codereel storyboard <repo> --out .codereel
  codereel kit <repo> --out .codereel
  codereel verify <storyboard.json> --repo <repo>
  codereel export <storyboard.json> --out .codereel/frames
`);
}
