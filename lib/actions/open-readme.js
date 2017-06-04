'use babel';

import DependenciesView from '../views/DependenciesView';
import getDependencies from '../yarn/get-dependencies';
import reportError from '../report-error';
import { File } from 'atom';
import path from 'path';

async function openReadme(projectFolder) {
  const dependencies = await getDependencies(projectFolder);

  const view = new DependenciesView(dependencies, pkg => {
    const readmePath = path.join(
      projectFolder,
      'node_modules',
      pkg,
      'readme.md'
    );
    const readme = new File(readmePath);

    if (readme.existsSync()) {
      const projectReadmePath = path.join(
        path.basename(projectFolder),
        'node_modules',
        pkg,
        'readme.md'
      );

      if (atom.packages.isPackageActive('markdown-preview')) {
        atom.workspace.open(`markdown-preview://${encodeURI(readmePath)}`);
      } else {
        atom.workspace.open(readmePath);
      }
    }
  });

  view.show();
}

export default openReadme;
