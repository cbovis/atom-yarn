'use babel';

import yarnExec from '../yarn/exec';
import outputViewManager from '../atom/output-view-manager.js';
import path from 'path';

export default async function(projectFolder) {
  outputViewManager.clear();

  const success = await yarnExec(
    projectFolder,
    'init',
    ['--yes'],
    outputViewManager
  );

  if (!success) {
    outputViewManager.show();
    atom.notifications.addError(
      `An error occurred whilst initializing. See output for more information.`
    );

    return;
  }

  atom.notifications.addSuccess(`Created package.json with default values`);
  atom.workspace.open(path.join(projectFolder, 'package.json'));
}
