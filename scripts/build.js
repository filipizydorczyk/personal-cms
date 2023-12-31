const { name, version } = require('../package.json');
const { spawn } = require('child_process');

const proc = spawn('docker', [
  'build',
  '-f',
  './Dockerfile',
  '-t',
  `${name}:${version}`,
  '-t',
  `${name}:latest`,
  '.',
]);

proc.stdout.on('data', (data) => {
  console.log(`${data}`);
});

proc.stderr.on('data', (data) => {
  console.warn(`${data}`);
});

proc.on('error', (error) => {
  console.error(`${error.message}`);
});

proc.on('close', (code) => {
  console.log(`Child process exited with code ${code}`);
});
