'use babel';

import DependenciesView from '../views/DependenciesView';
import getDependencies from '../yarn/get-dependencies';
import yarnExec from '../yarn/exec';
import reportError from '../report-error';
import addProgressNotification from '../add-progress-notification';
import path from 'path';

export default async function(projectFolderPath) {
  const dependencies = await getDependencies(projectFolderPath);

  const view = new DependenciesView(dependencies, selected => {
    const projectFolder = path.basename(projectFolderPath);
    let progress;

    const options = {
      onStart: () => {
        progress = addProgressNotification(
          `Removing ${selected} package from ${projectFolder}...`
        );
      }
    };

    yarnExec(projectFolderPath, 'remove', [selected], options)
      .then(success => {
        progress.dismiss();

        if (!success) {
          atom.notifications.addError(
            `An error occurred removing the ${selected} package. See output for more information.`
          );

          return;
        }

        atom.notifications.addSuccess(
          `Removed ${selected} package from ${projectFolder}`
        );
      })
      .catch(reportError);
  });

  view.show();
}
