'use babel';

import path from 'path';
import DependenciesView from '../views/DependenciesView';
import getDependencies from '../yarn/get-dependencies';
import yarnExec from '../yarn/exec';
import reportError from '../report-error';
import addProgressNotification from '../add-progress-notification';
import { COMMAND_TYPE_LONG_RUNNING } from '../constants';
import output from '../yarn/output';
import shouldDisplayOutput from '../should-display-output';

export default async function (projectFolderPath) {
  const dependencies = await getDependencies(projectFolderPath);

  const view = new DependenciesView(dependencies, (selected) => {
    const projectFolder = path.basename(projectFolderPath);
    let progress;

    const options = {
      onStart: () => {
        progress = addProgressNotification(
          `Removing ${selected} package from ${projectFolder}...`,
        );

        if (shouldDisplayOutput(COMMAND_TYPE_LONG_RUNNING)) {
          output.show();
        }
      },
    };

    yarnExec(projectFolderPath, 'remove', [selected], options)
      .then((success) => {
        progress.dismiss();

        if (!success) {
          atom.notifications.addError(
            `An error occurred removing the ${selected} package. See output for more information.`,
          );

          return;
        }

        atom.notifications.addSuccess(
          `Removed ${selected} package from ${projectFolder}`,
        );
      })
      .catch(reportError);
  });

  view.show();
}
