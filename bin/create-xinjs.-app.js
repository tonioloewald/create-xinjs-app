#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

if (process.argv.length < 3) {
  console.log('You have to provide a name to your app.');
  console.log('For example :');
  console.log('    npx create-xinjs-app my-app');
  process.exit(1);
}

const projectName = process.argv[2];
const currentPath = process.cwd();
const projectPath = path.join(currentPath, projectName);
const git_repo = 'https://github.com/tonioloewald/create-xinjs-app.git';

try {
  fs.mkdirSync(projectPath);
} catch (err) {
  if (err.code === 'EEXIST') {
    console.log(`"${projectName}" already exists.`);
  } else {
    console.log(error);
  }
  process.exit(1);
}

async function main() {
  try {
    console.log('Downloading files...');
    execSync(`git clone --depth 1 ${git_repo} ${projectPath}`);

    process.chdir(projectPath);

    fs.rmdirSync(path.join(projectPath, 'bin'), { recursive: true});

    console.log('Done! Just install bun, bun install, and go…');

  } catch (error) {
    console.log(error);
  }
}
main();