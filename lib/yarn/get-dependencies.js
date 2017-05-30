'use babel';

import promisify from 'es6-promisify';
import jsonfile from 'jsonfile';
import path from 'path';

export default async function(projectFolder) {
  const readFile = promisify(jsonfile.readFile);
  const packageJsonPath = path.join(projectFolder, 'package.json');

  let packageJson;

  try {
    packageJson = await readFile(packageJsonPath);
  } catch (err) {
    throw {
      name: 'InvalidPackageJson',
      message: `Unable to read package.json file at '${packageJsonPath}'.`
    };
  }

  return packageJson.dependencies;
}
