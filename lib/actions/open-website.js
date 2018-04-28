'use babel';

import path from 'path';
import openUrl from 'opn';
import readPkg from 'read-pkg';

import DependenciesView from '../views/DependenciesView';
import getDependencies from '../yarn/get-dependencies';
import getRepositoryUrl from '../yarn/get-repository-url';

function getPackageJsonPath(projectFolder, pkg) {
  return path.join(projectFolder, 'node_modules', pkg, 'package.json');
}

async function openWebsite(projectFolder) {
  const dependencies = await getDependencies(projectFolder);
  const view = new DependenciesView(dependencies, async pkg => {
    const packageJsonPath = getPackageJsonPath(projectFolder, pkg);

    const packageJson = await readPkg(packageJsonPath);

    if (packageJson.homepage) {
      openUrl(packageJson.homepage);
    } else if (packageJson.repository) {
      openUrl(getRepositoryUrl(packageJson.repository));
    } else {
      atom.notifications.addError(`Unable to open website for ${pkg}`);
    }
  });

  view.show();
}

export default openWebsite;
