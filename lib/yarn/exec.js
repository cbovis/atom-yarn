'use babel';

import { BufferedProcess } from 'atom';
import { merge } from 'lodash';
import queue from './queue';
import output from './output';

export default async function(projectFolder, command, args, options) {
  const task = () => {
    const bin = atom.config.get('atom-yarn.bin');
    const env = merge({}, process.env, { NODE_ENV: 'development' });

    if (options && options.onStart) {
      options.onStart();
    }

    // TODO: Provide config to stop this always showing
    output.show();
    output.start();

    return new Promise(resolve => {
      new BufferedProcess({
        command: bin,
        args: args ? [command, ...args] : [command],
        stdout: output.write,
        stderr: output.write,
        exit: code => {
          resolve(code === 0);
        },
        options: {
          cwd: projectFolder,
          env
        }
      });
    });
  };

  return await queue.execute(task);
}
