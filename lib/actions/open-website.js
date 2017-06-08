'use babel';

import DependenciesView from '../views/DependenciesView';
import getDependencies from '../yarn/get-dependencies';
import reportError from '../report-error';
import path from 'path';
import promisify from 'es6-promisify';
import jsonfile from 'jsonfile';
import openUrl from 'opn';
import _ from 'lodash';

function getPackageJsonPath(projectFolder, pkg) {
  return path.join(projectFolder, 'node_modules', pkg, 'package.json');
}

async function openWebsite(projectFolder) {
  const dependencies = await getDependencies(projectFolder);
  const view = new DependenciesView(dependencies, pkg => {
    const packageJsonPath = getPackageJsonPath(projectFolder, pkg);
    const readFile = promisify(jsonfile.readFile);

    readFile(packageJsonPath)
      .then(packageJson => {
        if (packageJson.homepage) {
          openUrl(packageJson.homepage);
        } else if (_.has(packageJson, 'repository.url')) {
          openUrl(packageJson.repository.url);
        } else {
          atom.notifications.addError(`Unable to open website for ${pkg}`);
        }
      })
      .catch(err => {
        reportError(err);
      });
  });

  view.show();
}

export default openWebsite;
