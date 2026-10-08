import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

test("package metadata points public users at the source project", async () => {
  const pkg = JSON.parse(await readFile("package.json", "utf8"));

  assert.equal(pkg.repository.type, "git");
  assert.match(pkg.repository.url, /github\.com\/rogerchappel\/codereel/);
  assert.match(pkg.bugs.url, /github\.com\/rogerchappel\/codereel\/issues/);
  assert.match(pkg.homepage, /github\.com\/rogerchappel\/codereel#readme/);
});

test("release check includes pack verification", async () => {
  const pkg = JSON.parse(await readFile("package.json", "utf8"));

  assert.ok(pkg.scripts["package:smoke"]);
  assert.match(pkg.scripts["release:check"], /package:smoke/);
});

test("package allowlist includes runtime and public support files", async () => {
  const pkg = JSON.parse(await readFile("package.json", "utf8"));

  for (const entry of ["bin", "src", "demo", "fixtures", "README.md", "LICENSE", "SKILL.md"]) {
    assert.ok(pkg.files.includes(entry), `${entry} should be packed`);
  }
});

test("package smoke validates the packed runtime contract", async () => {
  const smoke = await readFile("scripts/package-smoke.js", "utf8");

  for (const artifact of ["bin/codereel.js", "src/index.js", "src/inspect.js", "docs/OUTPUT_CONTRACT.md"]) {
    assert.ok(smoke.includes(`'${artifact}'`), `${artifact} should be required by package smoke`);
  }
  assert.match(smoke, /npm', \['pack', '--json'\]/);
  assert.match(smoke, /installedRoot.*bin\/codereel\.js/s);
  assert.match(smoke, /process\.execPath/);
});
