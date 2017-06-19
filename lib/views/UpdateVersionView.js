'use babel';

import TextEntryView from './TextEntryView';

class UpdateVersionView extends TextEntryView {
  constructor(onComplete) {
    super('Enter new version...');

    this.onComplete = onComplete;
  }

  onConfirm(moduleName) {
    this.onComplete(moduleName);
    super.destroy();
  }
}

export default UpdateVersionView;
