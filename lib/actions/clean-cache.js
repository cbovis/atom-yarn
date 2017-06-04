'use babel';

import yarnExec from '../yarn/exec';
import outputViewManager from '../atom/output-view-manager.js';
import reportError from '../report-error';

const cleanCache = async () => {
  outputViewManager.clear();
  outputViewManager.show();

  const success = await yarnExec(null, 'cache', ['clean'], outputViewManager);

  if (!success) {
    atom.notifications.addError(
      `An error occurred whilst cleaning cache. See output for more information.`
    );

    return;
  }

  atom.notifications.addSuccess(`Global package cache has been cleaned`);
};

const confirmation = async () => {
  atom.confirm({
    message: 'Are you sure you want to clean the global Yarn cache?',
    detailedMessage:
      'Cleaning your global package cache will force Yarn to download packages from the npm registry the next time a package is requested.',
    buttons: {
      'Clean Cache': () => {
        cleanCache().catch(reportError);
      },
      Cancel: null
    }
  });
};

export default confirmation;
