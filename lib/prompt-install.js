'use babel';

import { flow, last, split } from 'lodash/fp';
import timestamp from 'unix-timestamp';
import installAction from './actions/install';
import yarnQueue from './yarn/queue';

const notificationTitle = 'NPM dependencies may be out of sync';

function buildDescription(projectPath) {
  const projectFolder = flow(split('/'), last)(projectPath);

  return `Changes were detected to dependencies in the package.json file of
          the <strong>${projectFolder}</strong> project folder. This means your
          node_modules folder is now likely to be out of sync.
          <br /><br />
          Would you like to sync your node_modules folder with dependencies
          in package.json? This will run the <code>yarn install</code> command.`;
}

function promptAlreadyVisible() {
  return atom.notifications
    .getNotifications()
    .some(
      notification =>
        notification.getMessage() === notificationTitle &&
        !notification.isDismissed(),
    );
}

function showPrompt(projectFolder) {
  atom.notifications.addWarning(notificationTitle, {
    description: buildDescription(projectFolder),
    buttons: [
      {
        text: 'Sync Dependencies',
        onDidClick() {
          installAction(projectFolder);
          this.model.dismiss();
        },
      },
      {
        text: 'Dismiss',
        onDidClick() {
          this.model.dismiss();
        },
      },
    ],
    dismissable: true,
  });
}

function promptInstall(projectFolder) {
  // BufferedProcess sometimes writes to package.json/yarn.lock after the child
  // process has exited which makes it tough to determine if
  // package.json changes were external. The quickest solution is to
  // provide a grace period of a couple seconds when detecting changes.
  const gracePeriodInSeconds = 2;
  const packageJsonBusy =
    yarnQueue.executing ||
    (yarnQueue.lastExecuted &&
      yarnQueue.lastExecuted > timestamp.now() - gracePeriodInSeconds);

  if (packageJsonBusy) {
    return;
  }

  if (promptAlreadyVisible(projectFolder)) {
    return;
  }

  showPrompt(projectFolder);
}

export default promptInstall;
