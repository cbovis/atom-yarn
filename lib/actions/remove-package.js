'use babel';

import path from 'path';
import DependenciesView from '../views/DependenciesView';
import getDependencies from '../yarn/get-dependencies';
import YarnCommand from '../yarn/command';

export default async function(projectFolderPath) {
  const dependencies = await getDependencies(projectFolderPath);

  const view = new DependenciesView(dependencies, async selected => {
    const projectFolder = path.basename(projectFolderPath);

    await new YarnCommand('remove', [selected], true).execute(
      projectFolderPath,
      {
        progressMessage: `Removing ${selected} package from ${projectFolder}...`,
        errorMessage: `An error occurred removing the ${selected} package. See output for more information.`,
        successMessage: `Removed ${selected} package from ${projectFolder}`,
      },
    );
  });

  view.show();
}
