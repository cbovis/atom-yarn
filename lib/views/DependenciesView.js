'use babel';

import isPromise from 'is-promise';
import SelectListView from 'atom-select-list';

import reportError from '../report-error';

export default class DependenciesView {
  constructor(dependencies, onSelect, options = { badge: 'type' }) {
    this.selectListView = new SelectListView({
      items: dependencies,
      emptyMessage: 'No dependencies found',
      filterKeyForItem: item => item.name,
      elementForItem: item => {
        const li = document.createElement('li');

        if (item.type && options.badge === 'type') {
          li.innerHTML = `<span class="pull-right badge badge-info">${
            item.type
          }</span> ${item.name}`;
        } else if (options.badge === 'version') {
          li.innerHTML = `<span class="pull-right badge badge-info">${
            item.version
          }</span> ${item.name}`;
        } else {
          li.textContent = item.name;
        }

        return li;
      },
      didConfirmSelection: item => {
        this.hide();

        const result = onSelect(item.name);

        if (isPromise(result)) {
          result.catch(reportError);
        }
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
