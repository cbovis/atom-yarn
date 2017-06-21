"use babel";

import { BufferedProcess } from "atom";
import { merge } from "lodash";
import queue from "./queue";
import output from "./output";
import { CONFIG_KEY_BIN } from "../constants";
import addProgressNotification from "../add-progress-notification";
import shouldDisplayOutput from "../should-display-output";

class YarnCommand {
  constructor(command, args, isLongRunning = false) {
    this.command = command;
    this.args = args;
    this.isLongRunning = isLongRunning;
  }

  async execute(projectFolder, options) {
    const task = () => {
      const bin = atom.config.get(`atom-yarn.${CONFIG_KEY_BIN}`);
      const env = merge({}, process.env, {
        NODE_ENV: "development"
      });

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

      output.write(`$ ${bin} ${combinedArgs.join(" ")}`);

      return new Promise(resolve => {
        // eslint-disable-next-line no-new
        new BufferedProcess({
          command: bin,
          args: combinedArgs,
          stdout: output.write,
          stderr: output.write,
          exit: code => {
            const success = code === 0;

            if (progress) {
              progress.dismiss();
            }

            if (!success && options.errorMessage) {
              atom.notifications.addError(options.errorMessage);
              output.show();
            }

            if (success && options.successMessage) {
              atom.notifications.addSuccess(options.successMessage);
            }

            resolve(success);
          },
          options: {
            cwd: projectFolder,
            env
          }
        });
      });
    };

    const success = await queue.execute(task);

    return success;
  }
}

export default YarnCommand;
