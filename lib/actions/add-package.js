'use babel';

import arrayToSentence from 'array-to-sentence';
import path from 'path';
import AddPackageView from '../views/AddPackageView';
import yarnExec from '../yarn/exec';
import reportError from '../report-error';
import addProgressNotification from '../add-progress-notification';
import { COMMAND_TYPE_LONG_RUNNING } from '../constants';
import output from '../yarn/output';
import shouldDisplayOutput from '../should-display-output';

export default async function (projectFolderPath) {
  const view = new AddPackageView((pkgs) => {
    if (!pkgs || pkgs.length === 0) {
      return;
    }

    const pkgArray = pkgs.split(' ');
    const pkgNoun = pkgArray.length > 1 ? 'packages' : 'package';
    const pkgList = `${arrayToSentence(pkgArray)} ${pkgNoun}`;
    const projectFolder = path.basename(projectFolderPath);

    let progress;

    const options = {
      onStart: () => {
        progress = addProgressNotification(
          `Adding ${pkgList} to ${projectFolder}...`,
        );

        if (shouldDisplayOutput(COMMAND_TYPE_LONG_RUNNING)) {
          output.show();
        }
      },
    };

    yarnExec(projectFolderPath, 'add', pkgArray, options)
      .then((success) => {
        progress.dismiss();

        if (!success) {
          atom.notifications.addError(
            `An error occurred adding the ${pkgList}. See output for more information.`,
          );
          return;
        }

        atom.notifications.addSuccess(`Added ${pkgList} to ${projectFolder}`);
      })
      .catch(reportError);
  });

  view.attach();
}
