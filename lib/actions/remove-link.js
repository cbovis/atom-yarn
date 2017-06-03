'use babel';

import yarnExec from '../yarn/exec';
import activeProjectFolder from '../atom/active-project-folder';
import outputViewManager from '../atom/output-view-manager.js';
import getPackageJson from '../yarn/get-package-json';

export default async function() {
  const projectFolder = activeProjectFolder();

  if (!projectFolder) {
    atom.notifications.addError('Unable to determine active project folder.');
    return;
  }

  outputViewManager.clear();

  const success = await yarnExec(
    projectFolder,
    'unlink',
    null,
    outputViewManager
  );

  if (!success) {
    outputViewManager.show();
    atom.notifications.addError(
      `An error occurred whilst creating link. See output for more information.`
    );

    return;
  }

  const packageJson = await getPackageJson(projectFolder);

  atom.notifications.addSuccess(`Link removed for ${packageJson.name} package`);
}
