'use babel';

import yarnExec from '../yarn/exec';
import activeProjectFolder from '../atom/active-project-folder';
import outputViewManager from '../atom/output-view-manager.js';
import path from 'path';

export default async function() {
  const projectFolder = activeProjectFolder();

  if (!projectFolder) {
    atom.notifications.addError('Unable to determine active project folder.');
    return;
  }

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
  atom.open({
    pathsToOpen: path.join(projectFolder, 'package.json')
  });
}
