'use babel';

import { BufferedProcess } from 'atom';
import { merge } from 'lodash';
import queue from './queue';
import output from './output';
import { CONFIG_KEY_BIN } from '../constants';

export default async function (projectFolder, command, args, options = {}) {
  const task = () => {
    const bin = atom.config.get(`atom-yarn.${CONFIG_KEY_BIN}`);
    const env = merge({}, process.env, {
      NODE_ENV: 'development',
    });

    if (options.onStart) {
      options.onStart();
    }

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
