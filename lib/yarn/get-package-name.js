'use babel';

import readPkg from 'read-pkg';

export default async projectFolder => {
  const pkgJson = await readPkg(projectFolder);

  return pkgJson.name;
};
