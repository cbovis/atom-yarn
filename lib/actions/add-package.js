'use babel';

import AddPackageView from '../views/AddPackageView';
import yarnExec from '../yarn/exec';
import reportError from '../report-error';

export default async function(projectFolder) {
  // TODO: Handle this via an async api
  const view = new AddPackageView(pkg => {
    if (!pkg || pkg.length === 0) {
      return;
    }

    const options = {
      onStart: () => atom.notifications.addInfo(`Adding '${pkg}' package...`)
    };

    yarnExec(projectFolder, 'add', [pkg], options)
      .then(success => {
        if (!success) {
          atom.notifications.addError(
            `An error occurred adding the '${pkg}' package. See output for more information.`
          );
          return;
        }

        atom.notifications.addSuccess(`Added '${pkg}' to package.json`);
      })
      .catch(reportError);
  });

  view.attach();
}
