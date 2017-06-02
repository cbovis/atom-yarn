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

    this.createPalette();
    this.addCommands();
  }

  deactivate() {
    this.disposables.dispose();
    this.paletteView.destroy();
  }

  createPalette() {
    this.paletteView = new YarnPaletteView();
    this.disposables.add(
      atom.commands.add('atom-workspace', 'atom-yarn:toggle', () => {
        this.paletteView.toggle();
      })
    );
  }

  addCommands() {
    commands.forEach(command => {
      this.disposables.add(
        atom.commands.add('atom-workspace', command.name, command.action)
      );
    });

    this.disposables.add(
      atom.commands.add('atom-workspace', 'atom-yarn:toggle-output', () => {
        outputViewManager.toggle();
      })
    );
  }
}

export default new AtomYarn();
