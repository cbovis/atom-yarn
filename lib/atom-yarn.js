'use babel';

import { CompositeDisposable } from 'atom';
import YarnPaletteView from './views/YarnPaletteView';
import commands from './commands';

class AtomYarn {
  activate() {
    this.disposables = new CompositeDisposable();

    this.createPalette();
    this.addCommands();

    return this.paletteView.show();
  }

  async deactivate() {
    this.disposables.dispose();
    await this.paletteView.destroy();
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
  }
}

export default new AtomYarn();
