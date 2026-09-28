const path = require('path');
const { spawnSync } = require('child_process');

// Patch steps, run in order. fix-checksums must run last.
const steps = [
  'patches/core.js',
  'patches/workbench.js',
  'patches/jetski.js',
  'patches/extension.js',
  'fix-checksums.js'
];

for (const step of steps) {
  console.log(`\n=== ${step} ===`);
  const result = spawnSync(process.execPath, [path.join(__dirname, step)], { stdio: 'inherit' });
  if (result.status !== 0) {
    console.error(`\n[Error] ${step} failed (exit code ${result.status}).`);
    process.exit(result.status || 1);
  }
}

console.log('\n[OK] All patches applied.');
