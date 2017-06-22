'use babel';

import _ from 'lodash';
import readPkg from 'read-pkg';

export default async function (projectFolder) {
  const packageJson = await readPkg(projectFolder);
  const sourceMappings = {
    dependencies: null,
    devDependencies: 'dev',
    peerDependencies: 'peer',
    optionalDependencies: 'optional',
  };
  const dependencies = _(sourceMappings)
    .keys()
    .map(source =>
      _(packageJson[source])
        .toPairs()
        .map(pair => ({
          name: pair[0],
          version: pair[1],
          type: sourceMappings[source],
        }))
        .value(),
    )
    .flatten()
    .sortBy('name')
    .value();

  return dependencies;
}
