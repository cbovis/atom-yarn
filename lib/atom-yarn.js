'use babel';

import { CompositeDisposable, File } from 'atom';
import path from 'path';
import commands from './commands';
import { schema as configSchema } from './config';
import executeCommand from './execute-command';
import promptInstall from './prompt-install';
import YarnPaletteView from './views/YarnPaletteView';
import yarnOutput from './yarn/output';

class AtomYarn {
  static getAvailableCommands() {
    const hasProjectFolder = atom.project.getDirectories().length > 0;
    const hasPackageJson = atom.project
      .getDirectories()
      .some(directory => directory.getFile('package.json').existsSync());

    const availableCommands = commands.filter(
      command =>
        (hasProjectFolder || !command.requireProjectFolder) &&
        (hasPackageJson || !command.requirePackageJson),
    );

    return availableCommands;
  }

  constructor() {
    this.config = configSchema;
  }

  activate() {
    this.disposables = new CompositeDisposable();
    this.directoryListeners = new CompositeDisposable();
    this.disposables.add(this.directoryListeners);

    this.createPalette();
    this.addCommands();
    this.addProjectListener();
    this.addDirectoryListeners();
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
      this.constructor.getAvailableCommands(),
      onSelected,
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
        },
      }),
    );
  }

  addProjectListener() {
    this.disposables.add(
      atom.project.onDidChangePaths(() => {
        this.updatePalette();
        this.updateDirectoryListeners();
      }),
    );
  }

  addDirectoryListeners() {
    const directories = atom.project.getDirectories();
    const listeners = directories.map(directory =>
      directory.onDidChange(() => this.updatePalette()),
    );

    ['package.json', 'yarn.lock'].forEach(filename => {
      directories.forEach(directory => {
        const directoryPath = directory.getPath();
        const filePath = path.join(directoryPath, filename);

        listeners.push(
          new File(filePath).onDidChange(() => {
            promptInstall(directoryPath, filename);
          }),
        );
      });
    });

    this.directoryListeners.add(...listeners);
  }

  updatePalette() {
    this.paletteView.update(this.constructor.getAvailableCommands());
  }

  updateDirectoryListeners() {
    this.directoryListeners.dispose();
    this.directoryListeners = new CompositeDisposable();

    this.addDirectoryListeners();
  }
}

export default new AtomYarn();
