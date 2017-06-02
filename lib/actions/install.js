'use babel';

import { BufferedProcess } from 'atom';
import yarnExec from '../yarn/exec';
import activeProjectFolder from '../atom/active-project-folder';
import outputViewManager from '../atom/output-view-manager.js';

export default async function() {
  const projectFolder = activeProjectFolder();

  if (!projectFolder) {
    atom.notifications.addError('Unable to determine active project folder.');
    return;
  }

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
