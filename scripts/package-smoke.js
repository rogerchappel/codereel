import { spawnSync } from 'node:child_process';

const result = spawnSync('npm', ['pack', '--dry-run'], { encoding: 'utf8' });
const output = `${result.stdout || ''}\n${result.stderr || ''}`;
if (result.status !== 0) {
  process.stderr.write(output);
  process.exit(result.status || 1);
}

const required = [
  'bin/codereel.js',
  'src/index.js',
  'src/inspect.js',
  'src/storyboard.js',
  'docs/OUTPUT_CONTRACT.md',
  'docs/RELEASE_CANDIDATE.md',
  'fixtures/cli-tool/package.json',
  'SKILL.md',
  'README.md',
  'LICENSE'
];

const missing = required.filter((entry) => !output.includes(entry));
if (missing.length > 0) {
  console.error(`package smoke missing entries:\n${missing.join('\n')}`);
  process.exit(1);
}

console.log('package smoke passed');
