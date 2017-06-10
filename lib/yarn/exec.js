'use babel';

import { BufferedProcess } from 'atom';
import { merge } from 'lodash';
import queue from './queue';
import output from './output';

export default async function (projectFolder, command, args, options) {
  const task = () => {
    const bin = atom.config.get('atom-yarn.bin');
    const env = merge({}, process.env, {
      NODE_ENV: 'development',
    });

    if (options && options.onStart) {
      options.onStart();
    }

    // TODO: Provide config to stop this always showing
    output.show();
    output.start();

    const combinedArgs = args ? [command, ...args] : [command];

    output.write(`$ ${bin} ${combinedArgs.join(' ')}`);

    return new Promise((resolve) => {
      // eslint-disable-next-line no-new
      new BufferedProcess({
        command: bin,
        args: combinedArgs,
        stdout: output.write,
        stderr: output.write,
        exit: (code) => {
          resolve(code === 0);
        },
        options: {
          cwd: projectFolder,
          env,
        },
      });
    });
  };

  const result = await queue.execute(task);

  return result;
}
