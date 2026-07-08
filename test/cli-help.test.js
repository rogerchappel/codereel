import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";

test("cli help exits successfully", () => {
  const result = spawnSync(process.execPath, ["bin/codereel.js", "--help"], {
    encoding: "utf8"
  });

  assert.equal(result.status, 0);
  assert.match(result.stdout, /Usage:/);
  assert.match(result.stdout, /codereel inspect/);
  assert.equal(result.stderr, "");
});
