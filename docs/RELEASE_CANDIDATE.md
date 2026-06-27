# Release Candidate Notes

## 0.1.0

- Local-first repository inspection.
- Grounded claims and narrated walkthrough script generation.
- Renderer-neutral storyboard export.
- Verification report for claim evidence and risky demo commands.
- Static HTML frame export for quick review.

## Verification

Run:

```bash
npm test
npm run check
npm run smoke
npm run package:smoke
npm run release:check
```

`npm run check` also verifies the public package contract: source repository
links, issue tracker metadata, release script wiring, and the pack allowlist for
runtime files and support docs.

## PR Review Focus

- Confirm generated claims stay evidence-backed.
- Confirm static HTML frames render from `storyboard.json`.
- Confirm no external media provider is required for the core workflow.
- Confirm package metadata and pack contents still match the README-facing
  public surface.
