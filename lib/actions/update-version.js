'use babel';

import UpdateVersionView from '../views/UpdateVersionView';
import YarnCommand from '../yarn/command';
import reportError from '../report-error';
import getPackageVersion from '../yarn/get-package-version';

export default async function (projectFolder) {
  const view = new UpdateVersionView((versionSpecifier) => {
    if (!versionSpecifier || versionSpecifier.length === 0) {
      return;
    }

    new YarnCommand('version', ['--new-version', versionSpecifier])
      .execute(projectFolder, {
        errorMessage:
          'An error occurred updating package version. See output for more information.',
      })
      .then((success) => {
        if (!success) {
          return null;
        }
        return getPackageVersion(projectFolder);
      })
      .then((newVersion) => {
        if (newVersion) {
          atom.notifications.addSuccess(`Updated package version to ${newVersion}`);
        }
      })
      .catch(reportError);
  });

  view.attach();
}
