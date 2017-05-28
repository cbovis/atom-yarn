'use babel';

import { TextEditor, CompositeDisposable, Disposable } from 'atom';
import path from 'path';

export default class TextEntryView {
  constructor(prompt) {
    this.disposables = new CompositeDisposable();
    this.createElement(prompt);

    atom.commands.add(this.element, {
      'core:confirm': () => this.onConfirm(this.miniEditor.getText()),
      'core:cancel': () => this.destroy()
    });
  }

  attach() {
    this.panel = atom.workspace.addModalPanel({ item: this });
    this.miniEditor.element.focus();
    this.miniEditor.scrollToCursorPosition();
  }

  destroy() {
    if (this.panel) {
      this.panel.destroy();
      this.panel = null;
    }

    this.disposables.dispose();
    this.miniEditor.destroy();
  }

  createElement(prompt) {
    // Create container element
    this.element = document.createElement('div');

    // Create label
    let promptText = document.createElement('label');
    promptText.textContent = prompt;
    this.element.appendChild(promptText);

    // Create text box
    this.miniEditor = new TextEditor({ mini: true });

    // Handle text box blur
    blurHandler = () => {
      if (document.hasFocus) {
        this.destroy();
      }
    };
    this.miniEditor.element.addEventListener('blur', blurHandler);
    this.disposables.add(
      new Disposable(() =>
        this.miniEditor.element.removeEventListener('blur', blurHandler)
      )
    );

    // Append text box to element
    this.element.appendChild(this.miniEditor.element);
  }
}
