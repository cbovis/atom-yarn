'use babel';

import exec from './exec';

export default function(packageName, projectFolder) {
  return exec('add', [packageName], projectFolder);
}
