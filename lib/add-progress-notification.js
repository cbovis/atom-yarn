'use babel';

import _ from 'lodash';

function addProgressNotification(message) {
  atom.notifications.addInfo(message, {
    dismissable: true,
  });

  // This is a little icky but is the only method I can see in the atom
  // api for retrieving the notification that was created.
  const newNotification = _.head(
    atom.notifications
      .getNotifications()
      .filter(notification => notification.getMessage() === message),
  );

  return newNotification;
}

export default addProgressNotification;
