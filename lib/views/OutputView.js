'use babel';

import linkify from 'linkify-urls';

class OutputView {
  constructor() {
    this.element = document.createElement('div');
    this.element.classList.add('atom-yarn-output');

    this.content = document.createElement('pre');
    this.element.appendChild(this.content);
  }

  // eslint-disable-next-line class-methods-use-this
  getTitle() {
    return 'Yarn Output';
  }

  // eslint-disable-next-line class-methods-use-this
  getDefaultLocation() {
    return 'bottom';
  }

  show() {
    atom.workspace.onDidOpen((e) => {
      if (e.item === this) {
        this.scrollBottom();
      }
    });
    atom.workspace.open(this);
  }

  write(text) {
    const line = document.createElement('div');
    line.className = 'line';

    // Replace links with anchors
    let html = linkify(text);

    // If the first word is error, warning etc. then color code it
    html = html.replace(
      /^(error|warning|info|success)\s(.+)/,
      '<span class="text-$1">$1</span> $2',
    );

    line.innerHTML = html;
    this.content.appendChild(line);
    this.scrollBottom();
  }

  scrollBottom() {
    this.content.scrollTop = this.content.scrollHeight;
  }

  clear() {
    this.content.innerHTML = '';
  }

  toggle() {
    atom.workspace.toggle(this);
  }
}

export default OutputView;
