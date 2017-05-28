'use babel';

export default [
  {
    name: 'atom-yarn:add-package',
    description: 'Add Package',
    action: notImplementedNotification
  },
  {
    name: 'atom-yarn:remove-package',
    description: 'Remove Package',
    action: notImplementedNotification
  }
];

function notImplementedNotification() {
  atom.notifications.addError('Not Yet Implemented');
}
