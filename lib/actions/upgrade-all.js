'use babel';

import yarnExec from '../yarn/exec';
import activeProjectFolder from '../atom/active-project-folder';
import outputViewManager from '../atom/output-view-manager.js';

export default async function() {
  const projectFolder = activeProjectFolder();

  if (!projectFolder) {
    atom.notifications.addError('Unable to determine active project folder.');
    return;
  }

  outputViewManager.clear();

  atom.notifications.addInfo(`Upgrading all dependencies...`);

  const success = await yarnExec(
    projectFolder,
    'upgrade',
    null,
    outputViewManager
  );

  if (!success) {
    outputViewManager.show();
    atom.notifications.addError(
      `An error occurred whilst upgrading dependencies. See output for more information.`
    );

    return;
  }

  atom.notifications.addSuccess(
    `Upgraded all dependencies to latest permitted versions`
  );
}
