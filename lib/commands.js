'use babel';

import addPackage from './actions/add-package';
import removePackage from './actions/remove-package';
import init from './actions/init';
import install from './actions/install';

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
    name: 'atom-yarn:install',
    description: 'Install Dependencies',
    action: install
  },
  {
    name: 'atom-yarn:remove-package',
    description: 'Remove Package',
    action: removePackage
  }
];
