# Video Brief: Walkthrough Kit From A Docs-Only Repo

## Audience

Maintainers who need a truthful demo script for a small documentation repository or early project.

## Core Claim

`codereel` can inspect local files and create a walkthrough kit with claims, narration, storyboard, capture cues, and verification artifacts.

## 45-Second Flow

1. Show `fixtures/docs-only/README.md` and `fixtures/docs-only/docs/guide.md`.
2. Run `bash demo/run-docs-only-kit.sh`.
3. Open `.tmp/demo-docs-only-kit/kit/repo.json` to show detected files.
4. Open `.tmp/demo-docs-only-kit/kit/script.md` for the narration draft.
5. Open `.tmp/demo-docs-only-kit/kit/verification.json` to show evidence checks.
6. End on `.tmp/demo-docs-only-kit/frames/01-opening.html` as a renderer-neutral review frame.

## Hooks

- "A repo walkthrough should start with the files that are actually there."
- "`codereel` turns a local repo into a verified script, storyboard, capture cue sheet, and static review frames."
- "Useful demo assets, without pretending a docs-only project has a build pipeline."

## Guardrails

- Do not claim generated narration is ready to publish without editing.
- Do not claim `codereel` renders final video, posts to social platforms, or runs discovered commands.
- Keep the example tied to `fixtures/docs-only`.
