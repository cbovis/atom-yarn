'use babel';

function reportError(error) {
  // TODO: Display a more detailed error
  atom.notifications.addFatalError(
    'An error occurred, view the console for more information.'
  );
  console.error(error);
}

export default reportError;
