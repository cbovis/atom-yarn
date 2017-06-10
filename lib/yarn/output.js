'use babel';

import OutputView from '../views/OutputView';

const view = new OutputView();

let empty = true;

const outputViewManager = {
  show() {
    view.show();
  },
  write(line) {
    empty = false;
    view.write(line);
  },
  clear() {
    view.clear();
  },
  toggle() {
    view.toggle();
  },
  start() {
    if (!empty) {
      view.write(' ');
    }
  },
};

export default outputViewManager;
