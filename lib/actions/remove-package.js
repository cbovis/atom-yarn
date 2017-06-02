'use babel';

import DependenciesView from '../views/DependenciesView';
import getDependencies from '../yarn/get-dependencies';
import activeProjectFolder from '../atom/active-project-folder';
import yarnExec from '../yarn/exec';
import outputViewManager from '../atom/output-view-manager.js';

export default async function() {
  const projectFolder = activeProjectFolder();

  if (!projectFolder) return;

  let dependencies;

  try {
    dependencies = await getDependencies(projectFolder);
  } catch (err) {
    if (err.name === 'InvalidPackageJson') {
      atom.notifications.addError(err.message);
      return;
    }

    throw err;
  }

  const view = new DependenciesView(dependencies, selected => {
    atom.notifications.addInfo(`Removing '${selected}' package...`);
    outputViewManager.clear();

    yarnExec(
      projectFolder,
      'remove',
      [selected],
      outputViewManager
    ).then(success => {
      if (!success) {
        outputViewManager.show();
        atom.notifications.addError(
          `An error occurred removing the '${selected}' package. See output for more information.`
        );

        return;
      }

      atom.notifications.addSuccess(`Removed '${selected}' from package.json`);
    });
  });

  view.show();
}
