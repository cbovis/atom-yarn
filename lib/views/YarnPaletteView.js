'use babel';

import SelectListView from 'atom-select-list';
import commands from '../commands';

export default class YarnPaletteView {
  constructor(commands, onSelect) {
    this.selectListView = new SelectListView({
      items: commands,
      emptyMessage: 'No matches found',
      filterKeyForItem: item => item.description,
      elementForItem: item => {
        const li = document.createElement('li');
        li.textContent = item.description;
        return li;
      },
      didConfirmSelection: item => {
        this.hide();
        onSelect(item);
      },
      didCancelSelection: () => {
        this.hide();
      }
    });
    this.panel = atom.workspace.addModalPanel({
      item: this.selectListView
    });
  }

  destroy() {
    this.selectListView.destroy();
  }

  toggle() {
    if (this.panel.isVisible()) {
      this.hide();
    } else {
      this.show();
    }
  }

  show() {
    this.selectListView.reset();
    this.panel.show();
    this.selectListView.focus();
  }

  hide() {
    this.panel.hide();
  }

  update(commands) {
    this.selectListView.update({
      items: commands
    });
  }
}
