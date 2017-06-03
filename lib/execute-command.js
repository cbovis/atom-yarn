'use babel';

executeCommand = async command => {
  if (!command.requirePackageJson && !command.requireProjectFolder) {
    await command.action();
    return;
  }

  let paths;
  if (command.requirePackageJson) {
    paths = atom.project
      .getDirectories()
      .filter(directory => directory.getFile('package.json').existsSync())
      .map(directory => directory.getPath());
  } else {
    paths = atom.project.getPaths();
  }

  if (paths.length === 0) {
    throw new Error('Unable to find applicable project folder.');
  }

  if (paths.length === 1) {
    await command.action(paths[0]);
    return;
  }

  // Display path selection view
  throw new Error('Not yet implemented.');
};

export default executeCommand;
