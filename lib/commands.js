'use babel';

import _ from 'lodash';
import addPackage from './actions/add-package';
import removePackage from './actions/remove-package';
import init from './actions/init';
import install from './actions/install';
import upgradeAll from './actions/upgrade-all';
import createLink from './actions/create-link';
import removeLink from './actions/remove-link';
import cleanCache from './actions/clean-cache';

const commands = [
  {
    name: 'atom-yarn:add-package',
    description: 'Add Package',
    action: addPackage
  },
  {
    name: 'atom-yarn:clean-cache',
    description: 'Clean Cache',
    action: cleanCache,
    requirePackageJson: false,
    requireProjectFolder: false
  },
  {
    name: 'atom-yarn:create-link',
    description: 'Create Symlink',
    action: createLink
  },
  {
    name: 'atom-yarn:init',
    description: 'Initialize',
    action: init,
    requirePackageJson: false
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

function applyDefaults(commands) {
  const defaults = {
    requirePackageJson: true,
    requireProjectFolder: true
  };

  return commands.map(command => _.merge({}, defaults, command));
}

export default applyDefaults(commands);
