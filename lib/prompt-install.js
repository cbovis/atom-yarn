'use babel';

import path from 'path';
import timestamp from 'unix-timestamp';
import installAction from './actions/install';
import yarnQueue from './yarn/queue';

function buildMessage(projectFolder, filename) {
  const filePath = path.join(projectFolder, filename);

  return `Changes detected in ${filePath}`;
}

function promptAlreadyVisible(projectFolder) {
  const possibleMessages = ['package.json', 'yarn.lock'].map(filename =>
    buildMessage(projectFolder, filename),
  );

  return atom.notifications
    .getNotifications()
    .some(
      notification =>
        possibleMessages.some(msg => msg === notification.getMessage()) &&
        !notification.isDismissed(),
    );
}

function showPrompt(projectFolder, filename) {
  const message = buildMessage(projectFolder, filename);

  atom.notifications.addWarning(message, {
    description:
      'Would you like to update dependencies? This will run the `yarn install` command.',
    buttons: [
      {
        text: 'Update Dependencies',
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

  if (packageJsonBusy) {
    return;
  }

  if (promptAlreadyVisible(projectFolder)) {
    return;
  }

  showPrompt(projectFolder, filename);
}

export default promptInstall;
