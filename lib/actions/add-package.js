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

    yarnAdd(pkg, projectFolder);

    atom.notifications.addSuccess(`Package '${pkg}' added to package.json`);
  });

  view.attach();
}
