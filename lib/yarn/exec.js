'use babel';

import { BufferedProcess } from 'atom';
import { merge } from 'lodash';

export default function(projectFolder, command, args, outputWriter) {
  return new Promise(resolve => {
    const bin = atom.config.get('atom-yarn.bin');
    const env = merge({}, process.env, { NODE_ENV: 'development' });

    new BufferedProcess({
      command: bin,
      args: args ? [command, ...args] : [command],
      stdout: outputWriter.write,
      stderr: outputWriter.write,
      exit: code => {
        resolve(code === 0);
      },
      options: {
        cwd: projectFolder,
        env
      }
    });
  });
}
