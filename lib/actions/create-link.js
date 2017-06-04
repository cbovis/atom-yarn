'use babel';

import yarnExec from '../yarn/exec';
import getPackageJson from '../yarn/get-package-json';

export default async function(projectFolder) {
  const success = await yarnExec(projectFolder, 'link');

  if (!success) {
    atom.notifications.addError(
      `An error occurred whilst creating link. See output for more information.`
    );

    return;
  }

  const packageJson = await getPackageJson(projectFolder);

  atom.notifications.addSuccess(
    `Link created for ${packageJson.name} package to ${projectFolder}`
  );
}
