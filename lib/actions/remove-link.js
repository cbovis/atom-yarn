'use babel';

import YarnCommand from '../yarn/command';
import getPackageName from '../yarn/get-package-name';

export default async function (projectFolder) {
  const packageName = await getPackageName(projectFolder);

  await new YarnCommand('unlink').execute(projectFolder, {
    errorMessage: 'An error occurred whilst unlinking package. See output for more information.',
    successMessage: `Unlinked ${packageName} package from ${projectFolder}`,
  });
}
