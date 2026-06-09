#!/usr/bin/env bash
set -euo pipefail

tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT

node bin/codereel.js kit fixtures/cli-tool --out "$tmp/kit"
test -f "$tmp/kit/repo.json"
test -f "$tmp/kit/claims.json"
test -f "$tmp/kit/storyboard.json"
test -f "$tmp/kit/script.md"
test -f "$tmp/kit/assets.md"
node bin/codereel.js verify "$tmp/kit/storyboard.json" --repo fixtures/cli-tool > "$tmp/verification.json"
node bin/codereel.js export "$tmp/kit/storyboard.json" --out "$tmp/frames"
test -f "$tmp/frames/01-opening.html"

echo "codereel smoke passed"
