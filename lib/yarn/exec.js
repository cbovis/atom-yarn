'use babel';

const spawn = require('child_process').spawn;
const EventEmitter = require('events').EventEmitter;

export default function(command, args, projectFolder) {
  const bin = atom.config.get('atom-yarn.bin');
  const e = new EventEmitter();
  const add = spawn(bin, [command, ...args], {
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
