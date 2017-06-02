'use babel';

import OutputView from '../views/OutputView';

const view = new OutputView();

const outputViewManager = {
  show: function() {
    view.show();
  },
  write: function(line) {
    view.write(line);
  },
  clear: function() {
    view.clear();
  }
};

export default outputViewManager;
