'use babel';

import arrayToSentence from 'array-to-sentence';
import path from 'path';
import AddPackageView from '../views/AddPackageView';
import yarnExec from '../yarn/exec';
import reportError from '../report-error';
import addProgressNotification from '../add-progress-notification';

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
