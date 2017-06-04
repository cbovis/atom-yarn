'use babel';

import path from 'path';
import installAction from './actions/install';

function promptInstall(projectFolder) {
  const packageJsonPath = path.join(
    path.basename(projectFolder),
    'package.json'
  );

  atom.notifications.addWarning(`Changes detected in ${packageJsonPath}`, {
    description:
      'Would you like to update dependencies? This will run the `yarn install` command.',
    buttons: [
      {
        text: 'Update Dependencies',
        onDidClick: function() {
          installAction(projectFolder);
          this.removeNotification();
        }
      },
      {
        text: 'Dismiss',
        onDidClick: function() {
          this.removeNotification();
        }
      }
    ],
    dismissable: true
  });
}

export default promptInstall;
