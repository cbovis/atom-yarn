'use babel';

import AtomYarnView from './atom-yarn-view';
import { CompositeDisposable } from 'atom';

export default {

  atomYarnView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomYarnView = new AtomYarnView(state.atomYarnViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomYarnView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-yarn:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomYarnView.destroy();
  },

  serialize() {
    return {
      atomYarnViewState: this.atomYarnView.serialize()
    };
  },

  toggle() {
    console.log('AtomYarn was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
