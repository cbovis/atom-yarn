'use babel';

import path from 'path';
import yarnExec from '../yarn/exec';
import { COMMAND_TYPE_STANDARD } from '../constants';
import output from '../yarn/output';
import shouldDisplayOutput from '../should-display-output';

export default async function (projectFolder) {
  const options = {
    onStart: () => {
      if (shouldDisplayOutput(COMMAND_TYPE_STANDARD)) {
        output.show();
      }
    },
  };

  const success = await yarnExec(projectFolder, 'init', ['--yes'], options);

  if (!success) {
    atom.notifications.addError(
      'An error occurred whilst initializing. See output for more information.',
    );

    return;
  }

  atom.notifications.addSuccess('Created package.json with default values');
  atom.workspace.open(path.join(projectFolder, 'package.json'));
}
