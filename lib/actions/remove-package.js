'use babel';

import DependenciesView from '../views/DependenciesView';
import getDependencies from '../yarn/get-dependencies';
import yarnExec from '../yarn/exec';
import reportError from '../report-error';

export default async function(projectFolder) {
  const dependencies = await getDependencies(projectFolder);

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
