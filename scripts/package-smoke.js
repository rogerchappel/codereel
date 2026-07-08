import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const output = execFileSync('npm', ['pack', '--dry-run', '--json'], {
  encoding: 'utf8'
});
const [pack] = JSON.parse(output);
const files = new Set(pack.files.map((file) => file.path));
const packageJson = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));

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

const missing = required.filter((entry) => !files.has(entry));
if (missing.length > 0) {
  console.error(`package smoke missing entries:\n${missing.join('\n')}`);
  process.exit(1);
}

if (packageJson.bin?.codereel !== './bin/codereel.js') {
  console.error('package smoke failed: codereel bin must point to ./bin/codereel.js');
  process.exit(1);
}

if (packageJson.repository?.url !== 'git+https://github.com/rogerchappel/codereel.git') {
  console.error('package smoke failed: repository metadata must point at the public GitHub repo');
  process.exit(1);
}

console.log(`package smoke passed: ${pack.filename} includes ${pack.files.length} files`);
