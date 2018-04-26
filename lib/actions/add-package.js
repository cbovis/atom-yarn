'use babel';

import { isString } from 'lodash';
import arrayToSentence from 'array-to-sentence';
import path from 'path';
import AddPackageView from '../views/AddPackageView';
import reportError from '../report-error';
import YarnCommand from '../yarn/command';

export default (options = {}) => async projectFolderPath => {
  const view = new AddPackageView(pkgs => {
    if (!pkgs || pkgs.length === 0) {
      return;
    }

    const pkgArray = pkgs.split(' ');
    const pkgNoun = pkgArray.length > 1 ? 'packages' : 'package';
    const pkgList = `${arrayToSentence(pkgArray)} ${pkgNoun}`;
    const projectFolder = path.basename(projectFolderPath);
    const args = (isString(options.type) ? [`--${options.type}`] : []).concat(
      pkgArray,
    );

    new YarnCommand('add', args, true)
      .execute(projectFolderPath, {
        progressMessage: `Adding ${pkgList} to ${projectFolder}...`,
        errorMessage: `An error occurred adding the ${pkgList}. See output for more information.`,
        successMessage: `Added ${pkgList} to ${projectFolder}`,
      })
      .catch(reportError);
  });

  view.attach();
};
