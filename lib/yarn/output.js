'use babel';

import OutputView from '../views/OutputView';

const view = new OutputView();

let empty = true;

const outputViewManager = {
  show: function() {
    view.show();
  },
  write: function(line) {
    empty = false;
    view.write(line);
  },
  clear: function() {
    view.clear();
  },
  toggle: function() {
    view.toggle();
  },
  start: function() {
    if (!empty) {
      view.write(' ');
    }
  }
};

export default outputViewManager;
