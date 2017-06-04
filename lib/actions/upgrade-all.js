'use babel';

import yarnExec from '../yarn/exec';

export default async function(projectFolder) {
  const success = await yarnExec(projectFolder, 'upgrade', null, {
    onStart: () => atom.notifications.addInfo(`Upgrading all dependencies...`)
  });

  if (!success) {
    atom.notifications.addError(
      `An error occurred whilst upgrading dependencies. See output for more information.`
    );

    return;
  }

  atom.notifications.addSuccess(
    `Upgraded all dependencies to latest permitted versions`
  );
}
