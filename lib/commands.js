'use babel';

import _ from 'lodash';

import addPackage from './actions/add-package';
import cleanCache from './actions/clean-cache';
import clearOutput from './actions/clear-output';
import createLink from './actions/create-link';
import init from './actions/init';
import install from './actions/install';
import openReadme from './actions/open-readme';
import openRepository from './actions/open-repository';
import openWebsite from './actions/open-website';
import removeLink from './actions/remove-link';
import removePackage from './actions/remove-package';
import updateVersion from './actions/update-version';
import upgradeAll from './actions/upgrade-all';
import upgradePackage from './actions/upgrade-package';

const commands = [
  {
    name: 'atom-yarn:add-package',
    description: 'Add Packages',
    action: addPackage(),
  },
  {
    name: 'atom-yarn:add-package',
    description: 'Add Packages (Development)',
    action: addPackage({ type: 'dev' }),
  },
  {
    name: 'atom-yarn:add-package',
    description: 'Add Packages (Optional)',
    action: addPackage({ type: 'optional' }),
  },
  {
    name: 'atom-yarn:add-package',
    description: 'Add Packages (Peer)',
    action: addPackage({ type: 'peer' }),
  },
  {
    name: 'atom-yarn:clean-cache',
    description: 'Clean Cache',
    action: cleanCache,
    requirePackageJson: false,
    requireProjectFolder: false,
  },
  {
    name: 'atom-yarn:clear-output',
    description: 'Clear Output',
    action: clearOutput,
    requirePackageJson: false,
    requireProjectFolder: false,
  },
  {
    name: 'atom-yarn:create-link',
    description: 'Create Symlink',
    action: createLink,
  },
  {
    name: 'atom-yarn:init',
    description: 'Initialize',
    action: init,
    requirePackageJson: false,
  },
  {
    name: 'atom-yarn:install',
    description: 'Install Dependencies',
    action: install,
  },
  {
    name: 'atom-yarn:open-readme',
    description: 'Open README',
    action: openReadme,
  },
  {
    name: 'atom-yarn:open-repository',
    description: 'Open Repository',
    action: openRepository,
  },
  {
    name: 'atom-yarn:open-website',
    description: 'Open Website',
    action: openWebsite,
  },
  {
    name: 'atom-yarn:remove-package',
    description: 'Remove Package',
    action: removePackage,
  },
  {
    name: 'atom-yarn:remove-link',
    description: 'Remove Symlink',
    action: removeLink,
  },
  {
    name: 'atom-yarn:update-version',
    description: 'Update Version',
    action: updateVersion,
  },
  {
    name: 'atom-yarn:upgrade-all',
    description: 'Upgrade All',
    action: upgradeAll,
  },
  {
    name: 'atom-yarn:upgrade-package',
    description: 'Upgrade Package',
    action: upgradePackage,
  },
];

function applyDefaults() {
  const defaults = {
    requirePackageJson: true,
    requireProjectFolder: true,
  };

  return commands.map(command => _.merge({}, defaults, command));
}

export default applyDefaults();
