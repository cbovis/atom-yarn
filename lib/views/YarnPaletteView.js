'use babel';

import SelectListView from 'atom-select-list';
import commands from '../commands';

export default class YarnPaletteView {
  constructor() {
    this.selectListView = new SelectListView({
      items: [],
      emptyMessage: 'No matches found',
      filterKeyForItem: item => item.description,
      elementForItem: ({ description }) => `<li>${description}</li>`,
      didConfirmSelection: item => {
        this.hide();
        item.action();
      },
      didCancelSelection: () => {
        this.hide();
      }
    });
  }

  async destroy() {
    await this.selectListView.destroy();
  }

  toggle() {
    if (this.panel && this.panel.isVisible()) {
      this.hide();
      return Promise.resolve();
    } else {
      return this.show();
    }
  }

  async show() {
    if (!this.panel) {
      this.panel = atom.workspace.addModalPanel({ item: this.selectListView });
    }

    this.selectListView.reset();

    await this.selectListView.update({
      items: commands
    });

    this.panel.show();
    this.selectListView.focus();
  }

  hide() {
    this.panel.hide();
  }
}
