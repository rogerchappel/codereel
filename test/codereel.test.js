import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { buildClaims, buildStoryboard, createKit, inspectRepo, verifyKit } from "../src/index.js";

const cliFixture = path.resolve("fixtures/cli-tool");
const docsFixture = path.resolve("fixtures/docs-only");

test("inspects package scripts, bins, tests, and docs", async () => {
  const repo = await inspectRepo(cliFixture);
  assert.equal(repo.name, "demo-cli");
  assert.deepEqual(repo.bins, ["demo-cli"]);
  assert.ok(repo.scripts.includes("test"));
  assert.ok(repo.tests.includes("test/demo.test.js"));
});

test("generates evidence-backed claims", async () => {
  const repo = await inspectRepo(cliFixture);
  const claims = buildClaims(repo);
  assert.ok(claims.some((claim) => claim.id === "cli-surface"));
  assert.ok(claims.every((claim) => claim.evidence.length > 0));
});

test("builds four-scene storyboard", async () => {
  const repo = await inspectRepo(docsFixture);
  const claims = buildClaims(repo);
  const storyboard = buildStoryboard(repo, claims);
  assert.equal(storyboard.scenes.length, 4);
  assert.ok(storyboard.totalDurationSeconds > 0);
});

test("creates a complete output kit", async () => {
  const outDir = await mkdtemp(path.join(os.tmpdir(), "codereel-"));
  try {
    const result = await createKit(cliFixture, outDir);
    assert.equal(result.verification.status, "pass");
    const storyboard = JSON.parse(await readFile(path.join(outDir, "storyboard.json"), "utf8"));
    assert.equal(storyboard.repo.name, "demo-cli");
  } finally {
    await rm(outDir, { recursive: true, force: true });
  }
});

test("verification warns only when evidence is missing", async () => {
  const repo = await inspectRepo(cliFixture);
  const claims = buildClaims(repo);
  const storyboard = buildStoryboard(repo, claims);
  const report = verifyKit(repo, claims, storyboard);
  assert.equal(report.status, "pass");
});
