# codereel

`codereel` turns a local repository into an honest walkthrough package for demo videos, launch posts, or release reviews. It inspects real files first, generates grounded claims, and emits renderer-neutral assets that another tool can turn into media.

## Quickstart

```bash
npm install
npm run smoke
node bin/codereel.js kit ./fixtures/cli-tool --out .codereel
```

The kit includes:

- `repo.json`: detected repo facts.
- `claims.json`: generated claims with evidence.
- `script.md`: narrated walkthrough script.
- `storyboard.json`: scene timeline for renderers.
- `demo-commands.md`: safe local command suggestions.
- `verification.json`: pass/warn report for claims and scenes.
- `assets.md`: screenshot and capture cue sheet.

## Commands

```bash
codereel inspect ./repo --out .codereel
codereel script ./repo --out .codereel
codereel storyboard ./repo --out .codereel
codereel kit ./repo --out .codereel
codereel verify .codereel/storyboard.json --repo ./repo
codereel export .codereel/storyboard.json --out .codereel/frames
```

## Examples

Generate a complete kit for a CLI project:

```bash
node bin/codereel.js kit fixtures/cli-tool --out /tmp/codereel-demo
```

Generate and verify a docs-only walkthrough kit:

```bash
bash demo/run-docs-only-kit.sh
```

Export static review frames:

```bash
node bin/codereel.js export /tmp/codereel-demo/storyboard.json --out /tmp/codereel-demo/frames
```

For a recording-ready walkthrough, see [docs/tutorials/docs-only-walkthrough-kit.md](docs/tutorials/docs-only-walkthrough-kit.md) and [docs/promo/docs-only-video-brief.md](docs/promo/docs-only-video-brief.md).

## Development

Run the same release-readiness checks locally before opening a PR:

```bash
npm run check
npm run build
npm test
npm run smoke
npm run package:smoke
npm run release:check
```

## Limitations

- V1 only accepts local paths.
- Generated narration is template-based and should be edited before publishing.
- Verification checks evidence links and safe command detection; it does not prove product quality.
- Final video rendering, avatar generation, TTS, and social posting are intentionally out of scope.

## Safety Notes

`codereel` reads the target repository and writes to the selected output directory. It does not publish, clone, mutate the inspected repo, call paid media APIs, or run discovered project commands.

## Release Verification

Before publishing or tagging a release, run the local verification path that matches CI:

- `npm run release:check`
- `npm run package:smoke`

The release checklist in `docs/release-readiness.md` captures the package surface, CLI bins, and reviewer notes for future release PRs.
`package:smoke` runs a dry-run package build and confirms the CLI, source
modules, fixtures, docs, skill file, README, and license are present in the
tarball.
