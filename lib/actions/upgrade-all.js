'use babel';

import yarnExec from '../yarn/exec';
import outputViewManager from '../atom/output-view-manager.js';

export default async function(projectFolder) {
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
