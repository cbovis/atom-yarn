'use babel';

import getPackageJson from './get-package-json';

export default async function(projectFolder) {
  const packageJson = await getPackageJson(projectFolder);

  // TODO: Get other dependencies as well
  return packageJson.dependencies;
}
