'use babel';

import yarnExec from '../yarn/exec';
import addProgressNotification from '../add-progress-notification';

export default async function (projectFolder) {
  let progress;

  const options = {
    onStart: () => {
      progress = addProgressNotification('Updating dependencies...');
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
