'use babel';

import AddPackageView from '../views/AddPackageView';

export default function() {
  const view = new AddPackageView(pkg => {
    if (!pkg || pkg.length === 0) {
      return;
    }
    atom.notifications.addSuccess(`Package '${pkg}' added to package.json`);
  });

  view.attach();
}
