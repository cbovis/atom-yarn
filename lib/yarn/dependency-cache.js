'use babel';

import { isEqual } from 'lodash';
import getDependencies from './get-dependencies';

class DependencyCache {
  constructor() {
    this.dependenciesByProject = {};
  }

  async checkOutdated(projectFolder) {
    const dependencies = await getDependencies(projectFolder);
    const cachedDependencies = this.dependenciesByProject[projectFolder];

    return !isEqual(dependencies, cachedDependencies);
  }

  async update(projectFolder) {
    const dependencies = await getDependencies(projectFolder);

    this.dependenciesByProject[projectFolder] = dependencies;
  }
}

export default DependencyCache;
