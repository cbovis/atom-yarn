'use babel';

import arrayToSentence from 'array-to-sentence';
import path from 'path';
import AddPackageView from '../views/AddPackageView';
import reportError from '../report-error';
import YarnCommand from '../yarn/command';

export default async function(projectFolderPath) {
  const view = new AddPackageView(pkgs => {
    if (!pkgs || pkgs.length === 0) {
      return;
    }

    const pkgArray = pkgs.split(' ');
    const pkgNoun = pkgArray.length > 1 ? 'packages' : 'package';
    const pkgList = `${arrayToSentence(pkgArray)} ${pkgNoun}`;
    const projectFolder = path.basename(projectFolderPath);

    new YarnCommand('add', pkgArray, true)
      .execute(projectFolderPath, {
        progressMessage: `Adding ${pkgList} to ${projectFolder}...`,
        errorMessage: `An error occurred adding the ${pkgList}. See output for more information.`,
        successMessage: `Added ${pkgList} to ${projectFolder}`,
      })
      .catch(reportError);
  });

  view.attach();
}
