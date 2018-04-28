'use babel';

import path from 'path';
import DependenciesView from '../views/DependenciesView';
import getDependencies from '../yarn/get-dependencies';
import UpgradePackageView from '../views/UpgradePackageView';
import YarnCommand from '../yarn/command';

export default async function(projectFolderPath) {
  const dependencies = await getDependencies(projectFolderPath);
  const onDependencySelected = selected => {
    const projectFolder = path.basename(projectFolderPath);

    new UpgradePackageView(async newVersion => {
      await new YarnCommand(
        'upgrade',
        [`${selected}@${newVersion}`],
        true,
      ).execute(projectFolderPath, {
        progressMessage: `Upgrading ${selected} package to ${newVersion}...`,
        errorMessage: `An error occurred upgrading the ${selected} package to ${newVersion}. See output for more information.`,
        successMessage: `Upgraded ${selected} package to ${newVersion} in ${projectFolder}`,
      });
    }).attach();
  };

  const dependenciesView = new DependenciesView(
    dependencies,
    onDependencySelected,
    { badge: 'version' },
  );

  dependenciesView.show();
}
