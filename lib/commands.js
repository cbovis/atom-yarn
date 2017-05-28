'use babel';

import addPackage from './commands/add-package';

export default [
  {
    name: 'atom-yarn:add-package',
    description: 'Add Package',
    action: addPackage
  },
  {
    name: 'atom-yarn:remove-package',
    description: 'Remove Package',
    action: notImplementedNotification
  }
];

function notImplementedNotification() {
  atom.notifications.addError('Not Yet Implemented');
}
