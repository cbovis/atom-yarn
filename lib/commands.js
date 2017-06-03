'use babel';

import addPackage from './actions/add-package';
import removePackage from './actions/remove-package';
import init from './actions/init';
import install from './actions/install';
import upgradeAll from './actions/upgrade-all';
import createLink from './actions/create-link';
import removeLink from './actions/remove-link';

export default [
  {
    name: 'atom-yarn:add-package',
    description: 'Add Package',
    action: addPackage
  },
  {
    name: 'atom-yarn:create-link',
    description: 'Create Symlink',
    action: createLink
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
  },
  {
    name: 'atom-yarn:remove-link',
    description: 'Remove Symlink',
    action: removeLink
  },
  {
    name: 'atom-yarn:upgrade-all',
    description: 'Upgrade All',
    action: upgradeAll
  }
];
