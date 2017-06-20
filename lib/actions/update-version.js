'use babel';

import UpdateVersionView from '../views/UpdateVersionView';
import yarnExec from '../yarn/exec';
import reportError from '../report-error';
import getPackageVersion from '../yarn/get-package-version';
import { COMMAND_TYPE_STANDARD } from '../constants';
import output from '../yarn/output';
import shouldDisplayOutput from '../should-display-output';

export default async function (projectFolderPath) {
  const view = new UpdateVersionView((versionSpecifier) => {
    if (!versionSpecifier || versionSpecifier.length === 0) {
      return;
    }

    const options = {
      onStart: () => {
        if (shouldDisplayOutput(COMMAND_TYPE_STANDARD)) {
          output.show();
        }
      },
    };

    yarnExec(
      projectFolderPath,
      'version',
      ['--new-version', versionSpecifier],
      options,
    )
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
