'use babel';

import DependenciesView from '../views/DependenciesView';

import getDependencies from '../yarn/get-dependencies';
import activeProjectFolder from '../atom/active-project-folder';
import yarnRemove from '../yarn/remove';

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
    const remove = yarnRemove(selected, projectFolder);

    remove.on('done', success => {
      if (!success) {
        atom.notifications.addError(
          `An error occurred removing the '${selected}' package. See output for more information.`
        );

        return;
      }

      atom.notifications.addSuccess(`Removed '${selected}' from package.json`);
    });

    // TODO: Write the output to a docked output window instead
    remove.on('output', console.log);
    remove.on('error', console.error);
  });

  view.show();
}
