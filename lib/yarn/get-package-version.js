'use babel';

import getPackageJson from './get-package-json';

export default async function (projectFolder) {
  const packageJson = await getPackageJson(projectFolder);

  return packageJson.version;
}
