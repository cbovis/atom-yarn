'use babel';

import addPackage from './actions/add-package';
import removePackage from './actions/remove-package';
import init from './actions/init';

export default [
  {
    name: 'atom-yarn:add-package',
    description: 'Add Package',
    action: addPackage
  },
  {
    name: 'atom-yarn:init',
    description: 'Initialize',
    action: init
  },
  {
    name: 'atom-yarn:remove-package',
    description: 'Remove Package',
    action: removePackage
  }
];

function notImplementedNotification() {
  atom.notifications.addError('Not Yet Implemented');
}
