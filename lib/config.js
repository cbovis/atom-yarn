'use babel';

import {
  CONFIG_KEY_SHOW_OUTPUT,
  CONFIG_KEY_BIN,
  SHOW_OUTPUT_NEVER,
  SHOW_OUTPUT_ALWAYS,
  SHOW_OUTPUT_LONG_RUNNING,
} from './constants';

const config = {};

config[CONFIG_KEY_BIN] = {
  title: 'Executable Path',
  description: 'Enter the path to your yarn executable.',
  type: 'string',
  default: 'yarn',
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
};

export default config;
