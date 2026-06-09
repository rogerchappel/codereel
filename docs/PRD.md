# PRD: codereel

## Status

Initial release candidate.

## Problem

OSS maintainers often have working repositories but no fast way to create an honest demo-video brief. Generic video tools can render attractive media, but they do not inspect the codebase or verify claims.

## Goals

- Inspect a local repository for README content, package scripts, CLI bins, docs, examples, tests, and release notes.
- Generate a 3-5 scene narrated walkthrough script grounded in discovered evidence.
- Emit renderer-neutral `storyboard.json` for downstream HTML, Remotion, Hyperframes, or video tooling.
- Produce `claims.json`, `demo-commands.md`, and `verification.json` so agents can avoid fabricated claims.
- Stay useful without paid video APIs or external account writes.

## Non-Goals

- Rendering final MP4 files.
- Posting to social platforms.
- Voice cloning, avatar generation, or paid provider orchestration.
- Claiming benchmarks, adoption, compatibility, or release status that the repo does not support.

## Users

- Maintainers preparing a release demo.
- Agent builders turning repos into launch material.
- Devrel teams creating first-pass walkthrough scripts.

## MVP

The V1 CLI accepts a local repository and writes a walkthrough kit containing repo facts, claims, script, storyboard, demo command plan, verification, and optional static HTML frames.
