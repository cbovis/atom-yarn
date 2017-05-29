'use babel';

function getActivePath() {
  let activePaneItem = atom.workspace.getActivePaneItem();

  if (activePaneItem && typeof activePaneItem.getPath === 'function') {
    return activePaneItem.getPath();
  }
}

export default function() {
  let directories = atom.project.getDirectories();

  if (directories.length === 1) {
    return directories[0].getPath();
  }

  let activePath = getActivePath();

  if (!activePath) return;

  let relativized = atom.project.relativizePath(activePath);
  let projectFolder = relativized[0];

  return projectFolder;
}
