'use babel';

import readPkg from 'read-pkg';

export default async function(projectFolder) {
  const packageJson = await readPkg(projectFolder);

  return packageJson.version;
}
