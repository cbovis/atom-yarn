'use babel';

import UpdateVersionView from '../views/UpdateVersionView';
import yarnExec from '../yarn/exec';
import reportError from '../report-error';
import addProgressNotification from '../add-progress-notification';
import getPackageVersion from '../yarn/get-package-version';

export default async function (projectFolderPath) {
  const view = new UpdateVersionView((versionSpecifier) => {
    if (!versionSpecifier || versionSpecifier.length === 0) {
      return;
    }

    let progress;

    const options = {
      onStart: () => {
        progress = addProgressNotification('Updating package version...');
      },
    };

    yarnExec(
      projectFolderPath,
      'version',
      ['--new-version', versionSpecifier],
      options,
    )
      .then((success) => {
        progress.dismiss();

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
