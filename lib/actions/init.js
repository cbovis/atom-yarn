'use babel';

import path from 'path';
import yarnExec from '../yarn/exec';

export default async function (projectFolder) {
  const success = await yarnExec(projectFolder, 'init', ['--yes']);

  if (!success) {
    atom.notifications.addError(
      'An error occurred whilst initializing. See output for more information.',
    );

    return;
  }

  atom.notifications.addSuccess('Created package.json with default values');
  atom.workspace.open(path.join(projectFolder, 'package.json'));
}
