'use babel';

import yarnExec from '../yarn/exec';
import { COMMAND_TYPE_LONG_RUNNING } from '../constants';
import output from '../yarn/output';
import shouldDisplayOutput from '../should-display-output';

export default async function (projectFolder) {
  const options = {
    onStart: () => {
      atom.notifications.addInfo('Upgrading all dependencies...');

      if (shouldDisplayOutput(COMMAND_TYPE_LONG_RUNNING)) {
        output.show();
      }
    },
  };
  const success = await yarnExec(projectFolder, 'upgrade', null, options);

  if (!success) {
    atom.notifications.addError(
      'An error occurred whilst upgrading dependencies. See output for more information.',
    );

    return;
  }

  atom.notifications.addSuccess(
    'Upgraded all dependencies to latest permitted versions',
  );
}
