'use babel';

import TextEntryView from './TextEntryView';

class AddPackageView extends TextEntryView {
  constructor(onComplete) {
    super('Enter package name...');

    this.onComplete = onComplete;
  }

  onConfirm(moduleName) {
    this.onComplete(moduleName);
    super.destroy();
  }
}

export default AddPackageView;
