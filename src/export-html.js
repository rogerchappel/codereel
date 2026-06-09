import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

export async function exportHtmlFrames(storyboard, outDir) {
  await mkdir(outDir, { recursive: true });
  const files = [];
  for (const [index, scene] of storyboard.scenes.entries()) {
    const filename = `${String(index + 1).padStart(2, "0")}-${scene.id}.html`;
    await writeFile(path.join(outDir, filename), renderScene(storyboard, scene, index), "utf8");
    files.push(filename);
  }
  return files;
}

function renderScene(storyboard, scene, index) {
  return `<!doctype html>
<html lang="en">
<meta charset="utf-8">
<title>${escapeHtml(storyboard.repo.name)} - ${escapeHtml(scene.title)}</title>
<style>
body{font-family:Inter,system-ui,sans-serif;margin:0;background:#101820;color:#f8fafc}
main{display:grid;min-height:100vh;place-items:center;padding:48px}
section{max-width:920px}
p{font-size:30px;line-height:1.35}
.kicker{color:#8bd3dd;text-transform:uppercase;letter-spacing:.08em;font-size:14px}
.visual{color:#cbd5e1;font-size:20px}
</style>
<main><section>
<div class="kicker">Scene ${index + 1} / ${storyboard.scenes.length} - ${scene.durationSeconds}s</div>
<h1>${escapeHtml(scene.title)}</h1>
<p>${escapeHtml(scene.narration)}</p>
<p class="visual">${escapeHtml(scene.visual)}</p>
</section></main>
</html>
`;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;"
  })[char]);
}
