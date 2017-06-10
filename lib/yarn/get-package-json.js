'use babel';

import promisify from 'es6-promisify';
import jsonfile from 'jsonfile';
import path from 'path';

export default async function (projectFolder) {
  const readFile = promisify(jsonfile.readFile);
  const packageJsonPath = path.join(projectFolder, 'package.json');
  const packageJson = await readFile(packageJsonPath);

  return packageJson;
}
