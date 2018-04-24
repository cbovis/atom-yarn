'use babel';

import path from 'path';
import promisify from 'es6-promisify';
import jsonfile from 'jsonfile';
import openUrl from 'opn';
import DependenciesView from '../views/DependenciesView';
import getDependencies from '../yarn/get-dependencies';
import reportError from '../report-error';
import getRepositoryUrl from '../yarn/get-repository-url';

function getPackageJsonPath(projectFolder, pkg) {
  return path.join(projectFolder, 'node_modules', pkg, 'package.json');
}

async function openRepository(projectFolder) {
  const dependencies = await getDependencies(projectFolder);
  const view = new DependenciesView(dependencies, pkg => {
    const packageJsonPath = getPackageJsonPath(projectFolder, pkg);
    const readFile = promisify(jsonfile.readFile);

    readFile(packageJsonPath)
      .then(packageJson => {
        if (packageJson.repository) {
          openUrl(getRepositoryUrl(packageJson.repository));
        } else {
          atom.notifications.addError(`Unable to open repository for ${pkg}`);
        }
      })
      .catch(err => {
        reportError(err);
      });
  });

  view.show();
}

export default openRepository;
