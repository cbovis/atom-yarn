'use babel';

import { BufferedProcess } from 'atom';

export default function(projectFolder, command, args, outputWriter) {
  return new Promise(resolve => {
    const bin = atom.config.get('atom-yarn.bin');

    new BufferedProcess({
      command: bin,
      args: args ? [command, ...args] : [command],
      stdout: outputWriter.write,
      stderr: outputWriter.write,
      exit: code => {
        resolve(code === 0);
      },
      options: {
        cwd: projectFolder
      }
    });
  });
}
