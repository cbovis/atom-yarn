'use babel';

import yarnExec from '../yarn/exec';

export default async function(projectFolder) {
  const success = await yarnExec(projectFolder, 'install');

  if (!success) {
    outputViewManager.show();
    atom.notifications.addError(
      `An error occurred whilst installing dependencies. See output for more information.`
    );

    return;
  }

  atom.notifications.addSuccess(`Missing dependencies have been installed`);
}
