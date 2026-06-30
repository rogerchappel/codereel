#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT="$ROOT/.tmp/demo-docs-only-kit"

rm -rf "$OUT"
mkdir -p "$OUT"

echo "== generate docs-only walkthrough kit =="
node "$ROOT/bin/codereel.js" kit "$ROOT/fixtures/docs-only" --out "$OUT/kit"

echo
echo "== verify storyboard evidence =="
node "$ROOT/bin/codereel.js" verify "$OUT/kit/storyboard.json" --repo "$ROOT/fixtures/docs-only" | tee "$OUT/verification.json"

echo
echo "== export static review frames =="
node "$ROOT/bin/codereel.js" export "$OUT/kit/storyboard.json" --out "$OUT/frames"

test -f "$OUT/kit/repo.json"
test -f "$OUT/kit/claims.json"
test -f "$OUT/kit/script.md"
test -f "$OUT/kit/demo-commands.md"
test -f "$OUT/kit/assets.md"
test -f "$OUT/frames/01-opening.html"
grep -q 'Docs Only' "$OUT/kit/script.md"
grep -q '"status": "pass"' "$OUT/verification.json"

sed -n '1,36p' "$OUT/kit/script.md"

echo
echo "Demo artifacts written to $OUT"
