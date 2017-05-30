'use babel';

const spawn = require('child_process').spawn;
const EventEmitter = require('events').EventEmitter;

export default function(packageName, projectFolder) {
  const bin = atom.config.get('atom-yarn.bin');
  const e = new EventEmitter();
  const add = spawn(bin, ['add', packageName], {
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
