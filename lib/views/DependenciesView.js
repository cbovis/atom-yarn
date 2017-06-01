'use babel';

import SelectListView from 'atom-select-list';

export default class DependenciesView {
  constructor(dependencies, onSelect) {
    this.selectListView = new SelectListView({
      items: Object.keys(dependencies).map(x => ({
        name: x,
        version: dependencies[x]
      })),
      emptyMessage: 'No dependencies found',
      filterKeyForItem: item => item.name,
      elementForItem: item => {
        const li = document.createElement('li');
        li.textContent = item.name;
        return li;
      },
      didConfirmSelection: item => {
        this.hide();
        onSelect(item.name);
      },
      didCancelSelection: () => {
        this.hide();
      }
    });
  }

  destroy() {
    this.selectListView.destroy();
  }

  show() {
    if (!this.panel) {
      this.panel = atom.workspace.addModalPanel({
        item: this.selectListView
      });
    }

    this.panel.show();
    this.selectListView.focus();
  }

  hide() {
    this.panel.hide();
  }
}
