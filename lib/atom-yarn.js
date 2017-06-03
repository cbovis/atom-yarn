'use babel';

import { CompositeDisposable } from 'atom';
import YarnPaletteView from './views/YarnPaletteView';
import commands from './commands';
import config from './config';
import outputViewManager from './atom/output-view-manager';

class AtomYarn {
  constructor() {
    this.config = config;
  }

  activate() {
    this.disposables = new CompositeDisposable();
    this.directoryListeners = new CompositeDisposable();
    this.disposables.add(this.directoryListeners);

    this.createPalette();
    this.addCommands();
    this.addProjectListener();
  }

  deactivate() {
    this.disposables.dispose();
    this.paletteView.destroy();
  }

  createPalette() {
    this.paletteView = new YarnPaletteView(
      this.getAvailableCommands(),
      selectedCommand => selectedCommand.action()
    );
  }

  addCommands() {
    this.disposables.add(
      atom.commands.add('atom-workspace', {
        'atom-yarn:toggle-output': () => {
          outputViewManager.toggle();
        },
        'atom-yarn:toggle': () => {
          this.paletteView.toggle();
        }
      })
    );
  }

  addProjectListener() {
    this.disposables.add(
      atom.project.onDidChangePaths(() => {
        this.updatePalette();
        this.updateDirectoryListeners();
      })
    );
  }

  updatePalette() {
    console.debug('updating palette');
    this.paletteView.update(this.getAvailableCommands());
  }

  updateDirectoryListeners() {
    console.debug('updating directory listeners');

    this.directoryListeners.dispose();

    const listeners = atom.project
      .getDirectories()
      .map(directory => directory.onDidChange(() => this.updatePalette()));

    this.directoryListeners.add(...listeners);
  }

  getAvailableCommands() {
    const hasProjectFolder = atom.project.getDirectories().length > 0;
    const hasPackageJson = atom.project
      .getDirectories()
      .some(directory => directory.getFile('package.json').existsSync());

    const availableCommands = commands.filter(
      command =>
        (hasProjectFolder || !command.requireProjectFolder) &&
        (hasPackageJson || !command.requirePackageJson)
    );

    return availableCommands;
  }
}

export default new AtomYarn();
