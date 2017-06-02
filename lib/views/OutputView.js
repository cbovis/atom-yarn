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
    atom.workspace.onDidOpen(e => {
      if (e.item === this) {
        this.scrollBottom();
      }
    });
    atom.workspace.open(this);
  }

  write(text) {
    const line = document.createElement('div');
    line.className = 'line';

    // If the first word is error, warning etc. then color code it
    let html = text.replace(
      /^(error|warning|info|success)\s(.+)/,
      '<span class="text-$1">$1</span> $2'
    );

    line.innerHTML = html;
    this.content.appendChild(line);
    this.scrollBottom();
  }

  scrollBottom() {
    this.content.scrollTop = this.content.scrollHeight;
  }
}

export default OutputView;
