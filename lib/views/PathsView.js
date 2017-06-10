'use babel';

import SelectListView from 'atom-select-list';

class PathsView {
  constructor(paths, onSelect) {
    this.selectListView = new SelectListView({
      items: paths,
      emptyMessage: 'No paths found',
      filterKeyForItem: item => item,
      elementForItem: (item) => {
        const li = document.createElement('li');
        li.textContent = item;
        return li;
      },
      didConfirmSelection: (item) => {
        this.hide();
        onSelect(item);
      },
      didCancelSelection: () => {
        this.hide();
      },
    });
  }

  destroy() {
    this.selectListView.destroy();
  }

  show() {
    if (!this.panel) {
      this.panel = atom.workspace.addModalPanel({
        item: this.selectListView,
      });
    }

    this.panel.show();
    this.selectListView.focus();
  }

  hide() {
    this.panel.hide();
  }
}

export default PathsView;
