'use babel';

import yarnExec from '../yarn/exec';
import addProgressNotification from '../add-progress-notification';
import { COMMAND_TYPE_LONG_RUNNING } from '../constants';
import output from '../yarn/output';
import shouldDisplayOutput from '../should-display-output';

export default async function (projectFolder) {
  let progress;

  const options = {
    onStart: () => {
      progress = addProgressNotification('Updating dependencies...');

      if (shouldDisplayOutput(COMMAND_TYPE_LONG_RUNNING)) {
        output.show();
      }
    },
  };

  const success = await yarnExec(projectFolder, 'install', null, options);

  progress.dismiss();

  if (!success) {
    atom.notifications.addError(
      'An error occurred whilst updating dependencies. See output for more information.',
    );

    return;
  }

  atom.notifications.addSuccess('Dependencies have been updated');
}
