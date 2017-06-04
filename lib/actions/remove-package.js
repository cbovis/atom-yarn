'use babel';

import DependenciesView from '../views/DependenciesView';
import getDependencies from '../yarn/get-dependencies';
import yarnExec from '../yarn/exec';
import reportError from '../report-error';

export default async function(projectFolder) {
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

  // TODO: Handle this via an async api
  const view = new DependenciesView(dependencies, selected => {
    const options = {
      onStart: () =>
        atom.notifications.addInfo(`Removing '${selected}' package...`)
    };

    yarnExec(projectFolder, 'remove', [selected], options)
      .then(success => {
        if (!success) {
          atom.notifications.addError(
            `An error occurred removing the '${selected}' package. See output for more information.`
          );

          return;
        }

        atom.notifications.addSuccess(
          `Removed '${selected}' from package.json`
        );
      })
      .catch(reportError);
  });

  view.show();
}
