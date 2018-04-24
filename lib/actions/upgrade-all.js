'use babel';

import YarnCommand from '../yarn/command';

export default async function(projectFolder) {
  await new YarnCommand('upgrade', null, true).execute(projectFolder, {
    progressMessage: 'Upgrading all dependencies...',
    errorMessage:
      'An error occurred whilst upgrading dependencies. See output for more information.',
    successMessage: 'Upgraded all dependencies to latest permitted versions',
  });
}
