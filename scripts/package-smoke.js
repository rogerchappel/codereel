import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const output = execFileSync('npm', ['pack', '--json'], { encoding: 'utf8' });
const [pack] = JSON.parse(output);
const files = new Set(pack.files.map((file) => file.path));
const packageJson = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
const packageRoot = mkdtempSync(join(tmpdir(), 'codereel-package-smoke-'));

try {
  const archive = join(packageRoot, pack.filename);
  execFileSync('npm', ['pack', '--pack-destination', packageRoot], { stdio: 'ignore' });
  execFileSync('tar', ['-xzf', archive, '-C', packageRoot]);
  const installedRoot = join(packageRoot, 'package');
  const installedFiles = new Set(pack.files.map((file) => file.path));
  const required = [
    'bin/codereel.js',
    'src/index.js',
    'src/inspect.js',
    'src/storyboard.js',
    'docs/OUTPUT_CONTRACT.md',
    'docs/RELEASE_CANDIDATE.md',
    'demo/run-docs-only-kit.sh',
    'fixtures/cli-tool/package.json',
    'SKILL.md',
    'README.md',
    'LICENSE'
  ];
  const missing = required.filter((entry) => !installedFiles.has(entry));
  if (missing.length > 0) throw new Error(`package smoke missing entries:\n${missing.join('\n')}`);
  if (packageJson.bin?.codereel !== './bin/codereel.js') throw new Error('codereel bin must point to ./bin/codereel.js');
  if (packageJson.repository?.url !== 'git+https://github.com/rogerchappel/codereel.git') {
    throw new Error('repository metadata must point at the public GitHub repo');
  }
  execFileSync(process.execPath, [join(installedRoot, 'bin/codereel.js'), '--help'], { stdio: 'ignore' });
  console.log(`package smoke passed: ${pack.filename} includes ${files.size} files and installed CLI runs`);
} finally {
  rmSync(packageRoot, { recursive: true, force: true });
}
