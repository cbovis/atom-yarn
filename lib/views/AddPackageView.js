'use babel';

import TextEntryView from './TextEntryView';

class AddPackageView extends TextEntryView {
  constructor(onComplete) {
    super('Enter package names separated by spaces...');

    this.onComplete = onComplete;
  }

  onConfirm(moduleName) {
    this.onComplete(moduleName);
    super.destroy();
  }
}

export default AddPackageView;
