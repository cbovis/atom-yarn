'use babel';

import AddPackageView from '../views/AddPackageView';

export default function() {
  const view = new AddPackageView(pkg => {
    atom.notifications.addSuccess(`Package '${pkg}' added to package.json`);
  });

  view.attach();
}
