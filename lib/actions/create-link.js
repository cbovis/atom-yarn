'use babel';

import getPackageName from '../yarn/get-package-name';
import YarnCommand from '../yarn/command';

export default async function(projectFolder) {
  const packageName = await getPackageName(projectFolder);

  await new YarnCommand('link').execute(projectFolder, {
    errorMessage:
      'An error occurred whilst creating link. See output for more information.',
    successMessage: `Linked ${packageName} package to ${projectFolder}`,
  });
}
