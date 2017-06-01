'use babel';

import SelectListView from 'atom-select-list';
import commands from '../commands';

export default class YarnPaletteView {
  constructor() {
    this.selectListView = new SelectListView({
      items: [],
      emptyMessage: 'No matches found',
      filterKeyForItem: item => item.description,
      elementForItem: item => {
        const li = document.createElement('li');

        li.textContent = item.description;

        return li;
      },
      didConfirmSelection: item => {
        this.hide();
        item.action();
      },
      didCancelSelection: () => {
        this.hide();
      }
    });
  }

  destroy() {
    this.selectListView.destroy();
  }

  toggle() {
    if (this.panel && this.panel.isVisible()) {
      this.hide();
    } else {
      this.show();
    }
  }

  show() {
    if (!this.panel) {
      this.panel = atom.workspace.addModalPanel({
        item: this.selectListView
      });
    }

    this.selectListView.reset();

    this.selectListView.update({
      items: commands
    });

    this.panel.show();
    this.selectListView.focus();
  }

  hide() {
    this.panel.hide();
  }
}
