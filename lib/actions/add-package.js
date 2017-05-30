'use babel';

import AddPackageView from '../views/AddPackageView';
import yarnAdd from '../yarn/add';
import activeProjectFolder from '../atom/active-project-folder';

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

    add.on('done', success => {
      if (!success) {
        atom.notifications.addError(
          `An error occurred adding the '${pkg}' package. See output for more information.`
        );

        return;
      }

      atom.notifications.addSuccess(`Added '${pkg}' to package.json`);
    });

    // TODO: Write the output to a docked output window instead
    add.on('output', console.log);
    add.on('error', console.error);
  });

  view.attach();
}
