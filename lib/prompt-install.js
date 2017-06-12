'use babel';

import path from 'path';
import timestamp from 'unix-timestamp';
import installAction from './actions/install';
import yarnQueue from './yarn/queue';

function showPrompt(projectFolder, filename) {
  const filePath = path.join(path.basename(projectFolder), filename);

  atom.notifications.addWarning(`Changes detected in ${filePath}`, {
    description:
      'Would you like to update dependencies? This will run the `yarn install` command.',
    buttons: [
      {
        text: 'Update Dependencies',
        onDidClick() {
          installAction(projectFolder);
          this.removeNotification();
        },
      },
      {
        text: 'Dismiss',
        onDidClick() {
          this.removeNotification();
        },
      },
    ],
    dismissable: true,
  });
}

function promptInstall(projectFolder, filename) {
  // BufferedProcess sometimes writes to package.json/yarn.lock after the child
  // process has exited which makes it tough to determine if
  // package.json changes were external. The quickest solution is to
  // provide a grace period of a couple seconds when detecting changes.
  const gracePeriodInSeconds = 2;
  const packageJsonBusy =
    yarnQueue.executing ||
    (yarnQueue.lastExecuted &&
      yarnQueue.lastExecuted > timestamp.now() - gracePeriodInSeconds);

  if (!packageJsonBusy) {
    showPrompt(projectFolder, filename);
  }
}

export default promptInstall;
