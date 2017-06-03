'use babel';

import AddPackageView from '../views/AddPackageView';
import yarnExec from '../yarn/exec';
import outputViewManager from '../atom/output-view-manager.js';

export default async function(projectFolder) {
  const view = new AddPackageView(pkg => {
    if (!pkg || pkg.length === 0) {
      return;
    }

    atom.notifications.addInfo(`Adding '${pkg}' package...`);
    outputViewManager.clear();

    yarnExec(projectFolder, 'add', [pkg], outputViewManager).then(success => {
      if (!success) {
        outputViewManager.show();
        atom.notifications.addError(
          `An error occurred adding the '${pkg}' package. See output for more information.`
        );

        return;
      }

      atom.notifications.addSuccess(`Added '${pkg}' to package.json`);
    });
  });

  view.attach();
}
