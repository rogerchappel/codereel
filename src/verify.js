export function verifyKit(repo, claims, storyboard) {
  const claimResults = claims.map((claim) => ({
    id: claim.id,
    status: claim.evidence?.length ? "pass" : "warn",
    message: claim.evidence?.length ? "Claim has evidence." : "Claim has no evidence and should be edited.",
    evidence: claim.evidence ?? []
  }));

  const sceneResults = storyboard.scenes.map((scene) => ({
    id: scene.id,
    status: scene.evidence.length || scene.id === "next-step" ? "pass" : "warn",
    message: scene.evidence.length || scene.id === "next-step"
      ? "Scene is grounded enough for review."
      : "Scene has no direct evidence."
  }));

  return {
    status: [...claimResults, ...sceneResults].some((result) => result.status === "warn") ? "warn" : "pass",
    claimResults,
    sceneResults,
    generatedAt: new Date().toISOString()
  };
}

export function buildDemoCommands(repo) {
  const commands = [];
  if (repo.scripts.includes("test")) commands.push({ command: "npm test", confidence: "high", reason: "Declared package script." });
  if (repo.scripts.includes("check")) commands.push({ command: "npm run check", confidence: "high", reason: "Declared package script." });
  if (repo.scripts.includes("smoke")) commands.push({ command: "npm run smoke", confidence: "high", reason: "Declared package script." });
  if (repo.bins.length) commands.push({ command: `${repo.bins[0]} --help`, confidence: "medium", reason: "Package exposes a CLI bin." });
  return commands;
}

export function renderDemoCommands(commands) {
  if (!commands.length) return "# Demo Commands\n\nNo safe local demo commands were detected.\n";
  return [
    "# Demo Commands",
    "",
    ...commands.flatMap((item) => [
      `## ${item.command}`,
      "",
      `Confidence: ${item.confidence}`,
      "",
      item.reason,
      ""
    ])
  ].join("\n");
}
