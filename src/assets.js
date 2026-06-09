export function renderAssets(repo, storyboard) {
  return [
    "# Asset Plan",
    "",
    `Repository: ${repo.name}`,
    "",
    "## Capture Targets",
    "",
    ...captureTargets(repo).map((target) => `- ${target}`),
    "",
    "## Scene Assets",
    "",
    ...storyboard.scenes.flatMap((scene) => [
      `### ${scene.title}`,
      "",
      `- Visual direction: ${scene.visual}`,
      `- Suggested duration: ${scene.durationSeconds}s`,
      ""
    ])
  ].join("\n");
}

function captureTargets(repo) {
  const targets = [];
  if (repo.readmePath) targets.push(`${repo.readmePath} for the opening context shot`);
  if (repo.bins.length) targets.push("package.json bin field for the CLI surface");
  if (repo.scripts.length) targets.push("package.json scripts for verification commands");
  if (repo.docs.length) targets.push(`${repo.docs[0]} for documentation proof`);
  if (repo.examples.length) targets.push(`${repo.examples[0]} for fixture or example proof`);
  return targets.length ? targets : ["Repository file tree for cautious context"];
}
