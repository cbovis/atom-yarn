'use babel';

import reportError from '../report-error';
import TextEntryView from './TextEntryView';

class UpdateVersionView extends TextEntryView {
  constructor(onComplete) {
    super('Which version would you like to upgrade to?');

    this.onComplete = onComplete;
  }

  onConfirm(newVersion) {
    this.onComplete(newVersion).catch(reportError);
    super.destroy();
  }
}

export default UpdateVersionView;
