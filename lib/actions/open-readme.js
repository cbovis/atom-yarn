'use babel';

import { File } from 'atom';
import path from 'path';
import DependenciesView from '../views/DependenciesView';
import getDependencies from '../yarn/get-dependencies';

function getReadmePath(projectFolder, pkg) {
  return path.join(projectFolder, 'node_modules', pkg, 'readme.md');
}

async function openReadme(projectFolder) {
  const dependencies = (await getDependencies(
    projectFolder,
  )).filter(dependency =>
    new File(getReadmePath(projectFolder, dependency.name)).existsSync(),
  );
  const view = new DependenciesView(dependencies, (pkg) => {
    const readmePath = getReadmePath(projectFolder, pkg);

    if (atom.packages.isPackageActive('markdown-preview')) {
      atom.workspace.open(`markdown-preview://${encodeURI(readmePath)}`);
    } else {
      atom.workspace.open(readmePath);
    }
  });

  view.show();
}

export default openReadme;
