export function buildClaims(repo) {
  const claims = [];

  claims.push({
    id: "repo-purpose",
    text: `${repo.name} is ${repo.description || "a local repository with inspectable project files"}.`,
    evidence: repo.hasReadme ? [{ type: "file", path: repo.readmePath }] : [{ type: "file", path: "package.json" }],
    confidence: repo.description ? "high" : "medium"
  });

  if (repo.bins.length) {
    claims.push({
      id: "cli-surface",
      text: `${repo.name} exposes ${repo.bins.length === 1 ? `the ${repo.bins[0]} CLI` : `${repo.bins.length} CLI commands`}.`,
      evidence: [{ type: "package-bin", path: "package.json", value: repo.bins }],
      confidence: "high"
    });
  }

  if (repo.scripts.includes("test")) {
    claims.push({
      id: "test-script",
      text: `${repo.name} includes an npm test command for local verification.`,
      evidence: [{ type: "package-script", path: "package.json", value: "test" }],
      confidence: "high"
    });
  }

  if (repo.docs.length) {
    claims.push({
      id: "docs",
      text: `${repo.name} includes documentation for users or maintainers.`,
      evidence: repo.docs.slice(0, 5).map((file) => ({ type: "file", path: file })),
      confidence: "high"
    });
  }

  if (repo.examples.length) {
    claims.push({
      id: "examples",
      text: `${repo.name} includes examples or fixtures that can support a demo walkthrough.`,
      evidence: repo.examples.slice(0, 5).map((file) => ({ type: "file", path: file })),
      confidence: "high"
    });
  }

  return claims;
}
