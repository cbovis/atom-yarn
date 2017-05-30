'use babel';

import DependenciesView from '../views/DependenciesView';

import getDependencies from '../yarn/get-dependencies';
import activeProjectFolder from '../atom/active-project-folder';

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

  const view = new DependenciesView(dependencies, selected =>
    atom.notifications.addSuccess(`Removed '${selected}' from package.json`)
  );

  view.show();
}
