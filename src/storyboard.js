export function buildStoryboard(repo, claims) {
  const scenes = [
    {
      id: "opening",
      title: `What ${repo.name} does`,
      durationSeconds: 18,
      narration: claimText(claims, "repo-purpose"),
      visual: "Show the repository README, package metadata, and project name.",
      evidence: claimEvidence(claims, "repo-purpose")
    },
    {
      id: "how-to-run",
      title: "How to try it locally",
      durationSeconds: 24,
      narration: runNarration(repo),
      visual: "Show install and verification commands as terminal-ready steps.",
      evidence: [{ type: "file", path: "package.json" }]
    },
    {
      id: "proof",
      title: "What proof exists",
      durationSeconds: 22,
      narration: proofNarration(repo),
      visual: "Show test files, fixtures, examples, or documentation paths.",
      evidence: [...claimEvidence(claims, "test-script"), ...claimEvidence(claims, "examples"), ...claimEvidence(claims, "docs")]
    },
    {
      id: "next-step",
      title: "Where to go next",
      durationSeconds: 16,
      narration: `Use the generated kit to review claims, record a demo, or hand the storyboard to a renderer without adding unsupported promises.`,
      visual: "Show storyboard.json, claims.json, demo-commands.md, and verification.json.",
      evidence: []
    }
  ];

  return {
    schemaVersion: "0.1.0",
    repo: {
      name: repo.name,
      description: repo.description
    },
    totalDurationSeconds: scenes.reduce((sum, scene) => sum + scene.durationSeconds, 0),
    scenes
  };
}

export function renderScript(storyboard) {
  return [
    `# ${storyboard.repo.name} Walkthrough Script`,
    "",
    ...storyboard.scenes.flatMap((scene, index) => [
      `## Scene ${index + 1}: ${scene.title}`,
      "",
      `Duration: ${scene.durationSeconds}s`,
      "",
      scene.narration,
      "",
      `Visual: ${scene.visual}`,
      ""
    ])
  ].join("\n");
}

function claimText(claims, id) {
  return claims.find((claim) => claim.id === id)?.text ?? "This repository has local files that can be inspected before making claims.";
}

function claimEvidence(claims, id) {
  return claims.find((claim) => claim.id === id)?.evidence ?? [];
}

function runNarration(repo) {
  const commands = [];
  if (repo.scripts.includes("test")) commands.push("npm test");
  if (repo.scripts.includes("smoke")) commands.push("npm run smoke");
  if (repo.bins.length) commands.push(`npx ${repo.bins[0]} --help`);
  return commands.length
    ? `The quickest local demo path is to install dependencies, then run ${commands.join(", ")}.`
    : "The repository can be inspected locally, but no package scripts or CLI bins were detected.";
}

function proofNarration(repo) {
  const signals = [];
  if (repo.tests.length) signals.push(`${repo.tests.length} test file${repo.tests.length === 1 ? "" : "s"}`);
  if (repo.examples.length) signals.push(`${repo.examples.length} example or fixture file${repo.examples.length === 1 ? "" : "s"}`);
  if (repo.docs.length) signals.push(`${repo.docs.length} documentation file${repo.docs.length === 1 ? "" : "s"}`);
  return signals.length
    ? `The walkthrough can point to ${signals.join(", ")} as evidence.`
    : "The walkthrough should stay cautious because little supporting proof was detected.";
}
