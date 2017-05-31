'use babel';

class OutputView {
  constructor() {
    this.element = document.createElement('div');
    this.element.classList.add('atom-yarn-output');

    this.content = document.createElement('pre');
    this.element.appendChild(this.content);
  }

  getTitle() {
    return 'Yarn Output';
  }

  getDefaultLocation() {
    return 'bottom';
  }

  show() {
    atom.workspace.open(this);
  }

  write(text) {
    const line = document.createElement('div');

    line.className = 'line';
    line.textContent = text;

    this.content.appendChild(line);
    this.content.scrollTop = this.content.scrollHeight;
  }
}

export default OutputView;
