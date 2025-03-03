const path = require('path');
const fs = require('fs');
const child_process = require('child_process');

const gitPath = path.resolve(__dirname, '../../../.git');
const configPath = path.resolve(__dirname, './commitlint.config.js');
const commitlintBinPath = path.resolve(__dirname, './node_modules/.bin/commitlint');

if (!fs.existsSync(gitPath)) {
  console.error('no valid .git path');
  process.exit(1);
}

const result = child_process.spawnSync(
  process.platform === 'win32' ? 'cmd' : 'sh',
  [
    process.platform === 'win32' ? '/c' : '-c',
    process.platform === 'win32'
      ? `${commitlintBinPath} --config "${configPath}" --cwd "${path.dirname(gitPath)}" --edit`
      : `"${commitlintBinPath}" --config "${configPath}" --cwd "${path.dirname(gitPath)}" --edit`
  ],
  {
    stdio: 'inherit',
    shell: true
  }
  process.platform === 'win32' ? 'cmd' : 'sh',
  [
    process.platform === 'win32' ? '/c' : '-c',
    process.platform === 'win32'
      ? `${commitlintBinPath} --config "${configPath}" --cwd "${path.dirname(gitPath)}" --edit`
      : `"${commitlintBinPath}" --config "${configPath}" --cwd "${path.dirname(gitPath)}" --edit`
  ],
  process.platform === 'win32'
    ? {
        stdio: 'inherit',
        shell: true
      }
    : {
        stdio: 'inherit'
      }
);

if (result.status !== 0) {
  process.exit(1);
}
