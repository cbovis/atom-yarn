'use babel';

import exec from './exec';

export default function(projectFolder) {
  return exec('init', ['--yes'], projectFolder);
}
