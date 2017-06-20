'use babel';

import yarnExec from '../yarn/exec';
import getPackageJson from '../yarn/get-package-json';
import { COMMAND_TYPE_STANDARD } from '../constants';
import output from '../yarn/output';
import shouldDisplayOutput from '../should-display-output';

export default async function (projectFolder) {
  const options = {
    onStart: () => {
      if (shouldDisplayOutput(COMMAND_TYPE_STANDARD)) {
        output.show();
      }
    },
  };

  const success = await yarnExec(projectFolder, 'link', null, options);

  if (!success) {
    atom.notifications.addError(
      'An error occurred whilst creating link. See output for more information.',
    );

    return;
  }

  const packageJson = await getPackageJson(projectFolder);

  atom.notifications.addSuccess(
    `Link created for ${packageJson.name} package to ${projectFolder}`,
  );
}
