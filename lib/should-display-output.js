'use babel';

import {
  CONFIG_KEY_SHOW_OUTPUT,
  SHOW_OUTPUT_NEVER,
  SHOW_OUTPUT_ALWAYS,
  SHOW_OUTPUT_LONG_RUNNING,
} from './constants';

export default (isLongRunning) => {
  const displayLogic = atom.config.get(`atom-yarn.${CONFIG_KEY_SHOW_OUTPUT}`);

  switch (displayLogic) {
    case SHOW_OUTPUT_NEVER:
      return false;
    case SHOW_OUTPUT_ALWAYS:
      return true;
    case SHOW_OUTPUT_LONG_RUNNING:
      return isLongRunning;
    default:
      return false;
  }
};
