'use babel';

import { BufferedProcess } from 'atom';
import { merge } from 'lodash';
import queue from './queue';
import output from './output';
import { CONFIG_KEY_BIN, CONFIG_KEY_HIDE_OUTPUT, HIDE_OUTPUT_ON_SUCCESS } from '../constants';
import addProgressNotification from '../add-progress-notification';
import shouldDisplayOutput from '../should-display-output';
import { get as getConfig } from '../config';

class YarnCommand {
  constructor(command, args, isLongRunning = false) {
    this.command = command;
    this.args = args;
    this.isLongRunning = isLongRunning;
  }

  async execute(projectFolder, options) {
    const task = () => {
      const bin = getConfig(CONFIG_KEY_BIN);

      let progress;
      if (options.progressMessage) {
        progress = addProgressNotification(options.progressMessage);
      }

      if (shouldDisplayOutput(this.isLongRunning)) {
        output.show();
      }

      output.start();

      const { args, command } = this;
      const combinedArgs = args ? [command, ...args] : [command];

      output.write(`$ ${bin} ${combinedArgs.join(' ')}`);

      return new Promise((resolve) => {
        const env = merge({}, process.env, {
          NODE_ENV: 'development',
        });

        // eslint-disable-next-line no-new
        new BufferedProcess({
          command: bin,
          args: combinedArgs,
          stdout: output.write,
          stderr: output.write,
          exit: (code) => {
            const success = code === 0;

            if (progress) {
              progress.dismiss();
            }

            if (!success && options.errorMessage) {
              atom.notifications.addError(options.errorMessage);
              output.show();
            }

            if (success && options.successMessage) {
              const hideOutput = getConfig(CONFIG_KEY_HIDE_OUTPUT);
              if (hideOutput === HIDE_OUTPUT_ON_SUCCESS) {
                output.hide();
              }

              atom.notifications.addSuccess(options.successMessage);
            }

            resolve(success);
          },
          options: {
            cwd: projectFolder,
            env,
            shell: true,
          },
        });
      });
    };

    const success = await queue.execute(task);

    return success;
  }
}

export default YarnCommand;
