'use babel';

import yarnInit from '../yarn/init';
import activeProjectFolder from '../atom/active-project-folder';
import outputViewManager from '../atom/output-view-manager.js';
import path from 'path';

export default function() {
  const projectFolder = activeProjectFolder();

  if (!projectFolder) {
    atom.notifications.addError('Unable to determine active project folder.');
    return;
  }

  const init = yarnInit(projectFolder);

  init.on('done', success => {
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
  });

  init.on('output', outputViewManager.write);
  init.on('error', outputViewManager.write);
}
