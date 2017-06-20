'use babel';

import UpdateVersionView from '../views/UpdateVersionView';
import yarnExec from '../yarn/exec';
import reportError from '../report-error';
import getPackageVersion from '../yarn/get-package-version';

export default async function (projectFolderPath) {
  const view = new UpdateVersionView((versionSpecifier) => {
    if (!versionSpecifier || versionSpecifier.length === 0) {
      return;
    }

    yarnExec(projectFolderPath, 'version', ['--new-version', versionSpecifier])
      .then((success) => {
        if (!success) {
          atom.notifications.addError(
            'An error occurred updating package version. See output for more information.',
          );
          return null;
        }

        return getPackageVersion(projectFolderPath);
      })
      .then((newVersion) => {
        if (!newVersion) {
          return;
        }

        atom.notifications.addSuccess(
          `Updated package version to ${newVersion}`,
        );
      })
      .catch(reportError);
  });

  view.attach();
}
