# Output Contract

`storyboard.json` is intentionally renderer-neutral.

## Storyboard

```json
{
  "schemaVersion": "0.1.0",
  "repo": {
    "name": "demo-cli",
    "description": "A fixture CLI that formats release notes."
  },
  "totalDurationSeconds": 80,
  "scenes": [
    {
      "id": "opening",
      "title": "What demo-cli does",
      "durationSeconds": 18,
      "narration": "Grounded narration.",
      "visual": "Visual direction.",
      "evidence": [
        {
          "type": "file",
          "path": "README.md"
        }
      ]
    }
  ]
}
```

## Claims

Each claim has an `id`, `text`, `confidence`, and evidence array. Renderers should treat claims as copy inputs, not as proof of quality.

## Verification

`verification.json` reports `pass` or `warn`. A warning should block automatic publishing until a human or agent edits the unsupported copy.
