'use babel';

import yarnInstall from '../yarn/install';
import activeProjectFolder from '../atom/active-project-folder';
import outputViewManager from '../atom/output-view-manager.js';

export default function() {
  const projectFolder = activeProjectFolder();

  if (!projectFolder) {
    atom.notifications.addError('Unable to determine active project folder.');
    return;
  }

  const install = yarnInstall(projectFolder);

  install.on('done', success => {
    if (!success) {
      outputViewManager.show();
      atom.notifications.addError(
        `An error occurred whilst installing dependencies. See output for more information.`
      );

      return;
    }

    atom.notifications.addSuccess(`Missing dependencies have been installed`);
  });

  install.on('output', outputViewManager.write);
  install.on('error', outputViewManager.write);
}
