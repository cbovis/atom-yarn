'use babel';

const spawn = require('child_process').spawn;
const EventEmitter = require('events').EventEmitter;

export default function(projectFolder, command, args) {
  const bin = atom.config.get('atom-yarn.bin');
  const e = new EventEmitter();
  const spawnArgs = args ? [command, ...args] : [command];
  const add = spawn(bin, spawnArgs, {
    cwd: projectFolder
  });

  add.stdout.on('data', data => {
    e.emit('output', data.toString());
  });

  add.stderr.on('data', data => {
    e.emit('error', data.toString());
  });

  add.on('close', code => {
    const success = code == 0;

    e.emit('done', success);
  });

  return e;
}
