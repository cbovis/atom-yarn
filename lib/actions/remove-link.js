'use babel';

import YarnCommand from '../yarn/command';
import getPackageJson from '../yarn/get-package-json';

export default async function (projectFolder) {
  const packageJson = await getPackageJson(projectFolder);

  await new YarnCommand('unlink').execute(projectFolder, {
    errorMessage: 'An error occurred whilst unlinking package. See output for more information.',
    successMessage: `Unlinked ${packageJson.name} package from ${projectFolder}`,
  });
}
