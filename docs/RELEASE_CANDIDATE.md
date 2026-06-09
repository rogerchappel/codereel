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
```

## PR Review Focus

- Confirm generated claims stay evidence-backed.
- Confirm static HTML frames render from `storyboard.json`.
- Confirm no external media provider is required for the core workflow.
