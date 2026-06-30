# Generate A Docs-Only Walkthrough Kit

This recipe uses `fixtures/docs-only`, a tiny repository with a README and guide page, to show how `codereel` creates an honest walkthrough package without inventing package commands.

## Run The Demo

```bash
bash demo/run-docs-only-kit.sh
```

The script writes a kit under `.tmp/demo-docs-only-kit/kit/` and exported HTML review frames under `.tmp/demo-docs-only-kit/frames/`.

## Inspect The Outputs

- `repo.json` records discovered files and basic repository facts.
- `claims.json` keeps generated claims tied to local evidence.
- `script.md` provides a narration draft for a short walkthrough.
- `demo-commands.md` lists safe local command suggestions based on what was found.
- `verification.json` confirms storyboard evidence resolves against `fixtures/docs-only`.

## Recording Beats

1. Open `fixtures/docs-only/README.md` and `fixtures/docs-only/docs/guide.md`.
2. Run `bash demo/run-docs-only-kit.sh`.
3. Show `.tmp/demo-docs-only-kit/kit/script.md`.
4. Show `.tmp/demo-docs-only-kit/kit/demo-commands.md` to explain that the kit stays grounded in available files.
5. Open `.tmp/demo-docs-only-kit/frames/01-opening.html` as the static first frame.

## Boundaries

- `codereel` generates draft assets, not a final published video.
- The docs-only fixture should not be described as a production app.
- Commands listed in the generated kit are suggestions for review, not evidence that a project build passed.
