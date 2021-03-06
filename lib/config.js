'use babel';

import {
  CONFIG_KEY_BIN,
  CONFIG_KEY_HIDE_OUTPUT,
  CONFIG_KEY_PROMPT_INSTALL,
  CONFIG_KEY_SHOW_OUTPUT,
  SHOW_OUTPUT_NEVER,
  SHOW_OUTPUT_ALWAYS,
  SHOW_OUTPUT_LONG_RUNNING,
  HIDE_OUTPUT_NEVER,
  HIDE_OUTPUT_ON_SUCCESS,
} from './constants';

const config = {};

config[CONFIG_KEY_BIN] = {
  title: 'Executable Path',
  description: 'Enter the path to your yarn executable.',
  type: 'string',
  default: 'yarn',
  order: 1,
};

config[CONFIG_KEY_SHOW_OUTPUT] = {
  title: 'Show Output Pane',
  description: 'Choose when you would like to display the output pane.',
  type: 'string',
  enum: [
    { value: SHOW_OUTPUT_NEVER, description: 'Never' },
    { value: SHOW_OUTPUT_ALWAYS, description: 'Always' },
    {
      value: SHOW_OUTPUT_LONG_RUNNING,
      description: 'For long running commands',
    },
  ],
  default: SHOW_OUTPUT_LONG_RUNNING,
  order: 2,
};

config[CONFIG_KEY_HIDE_OUTPUT] = {
  title: 'Hide Output Pane',
  description: 'Choose when you would like to hide the output pane.',
  type: 'string',
  enum: [
    { value: HIDE_OUTPUT_NEVER, description: 'Never' },
    {
      value: HIDE_OUTPUT_ON_SUCCESS,
      description: 'On Success',
    },
  ],
  default: HIDE_OUTPUT_ON_SUCCESS,
  order: 3,
};

config[CONFIG_KEY_PROMPT_INSTALL] = {
  title: 'Prompt to sync dependencies',
  description:
    'Toggle whether a prompt to sync should be displayed when changes to dependencies are detected in package.json.',
  type: 'boolean',
  default: true,
  order: 4,
};

const get = configKey => atom.config.get(`atom-yarn.${configKey}`);

export { config as schema };
export { get };
