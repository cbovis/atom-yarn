'use babel';

import AddPackageView from '../views/AddPackageView';
import yarnAdd from '../yarn/add';
import activeProjectFolder from '../atom/active-project-folder';
import outputViewManager from '../atom/output-view-manager.js';

export default function() {
  const view = new AddPackageView(pkg => {
    if (!pkg || pkg.length === 0) {
      return;
    }

    const projectFolder = activeProjectFolder();

    if (!projectFolder) {
      atom.notifications.addError('Unable to determine active project folder.');
      return;
    }

    const add = yarnAdd(pkg, projectFolder);

    atom.notifications.addInfo(`Adding '${pkg}' package...`);

    add.on('done', success => {
      if (!success) {
        outputViewManager.show();
        atom.notifications.addError(
          `An error occurred adding the '${pkg}' package. See output for more information.`
        );

        return;
      }

      atom.notifications.addSuccess(`Added '${pkg}' to package.json`);
    });

    add.on('output', outputViewManager.write);
    add.on('error', outputViewManager.write);
  });

  view.attach();
}
