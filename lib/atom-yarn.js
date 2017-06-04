'use babel';

import { CompositeDisposable } from 'atom';
import commands from './commands';
import config from './config';
import executeCommand from './execute-command';
import promptInstall from './prompt-install';
import YarnPaletteView from './views/YarnPaletteView';
import yarnQueue from './yarn/queue';
import yarnOutput from './yarn/output';

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
    // The command executor is asynchronous however the palette view
    // cannot handle async errors nicely so they're handled
    // via a catch on the event handler promise.
    const onSelected = selectedCommand =>
      executeCommand(selectedCommand).catch(err => console.error(err));

    this.paletteView = new YarnPaletteView(
      this.getAvailableCommands(),
      onSelected
    );
  }

  addCommands() {
    this.disposables.add(
      atom.commands.add('atom-workspace', {
        'atom-yarn:toggle-output': () => {
          yarnOutput.toggle();
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

    listeners.concat(
      atom.project.getDirectories().map(directory =>
        directory.getFile('package.json').onDidChange(() => {
          if (!yarnQueue.executing) {
            promptInstall(directory.getPath());
          }
        })
      )
    );

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
