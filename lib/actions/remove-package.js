'use babel';

import getDependencies from '../yarn/get-dependencies';
import activeProjectFolder from '../atom/active-project-folder';

export default async function() {
  const projectFolder = activeProjectFolder();

  if (!projectFolder) return;

  let dependencies;

  try {
    dependencies = await getDependencies(projectFolder);
  } catch (err) {
    if (err.name === 'InvalidPackageJson') {
      atom.notifications.addError(err.message);
      return;
    }

    throw err;
  }

  console.log(dependencies);
}
