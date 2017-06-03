'use babel';

import yarnExec from '../yarn/exec';
import outputViewManager from '../atom/output-view-manager.js';

export default async function(projectFolder) {
  outputViewManager.clear();

  const success = await yarnExec(
    projectFolder,
    'install',
    null,
    outputViewManager
  );

  if (!success) {
    outputViewManager.show();
    atom.notifications.addError(
      `An error occurred whilst installing dependencies. See output for more information.`
    );

    return;
  }

  atom.notifications.addSuccess(`Missing dependencies have been installed`);
}
