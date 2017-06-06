'use babel';

import yarnOutput from '../yarn/output';

async function clearOutput() {
  yarnOutput.clear();

  atom.notifications.addSuccess('Yarn output pane has been cleared');
}

export default clearOutput;
