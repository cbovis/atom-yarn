'use babel';

import Queue from 'promise-queue';
import timestamp from 'unix-timestamp';

// The execution queue ensures that tasks are run one at a time
// to avoid Yarn conflicts. Additionally it allows other areas of
// the app to detect whether a task is being run.
class ExecutionQueue {
  constructor() {
    this.queue = new Queue(1, Infinity);
    this.executing = false;
  }

  async execute(task) {
    this.executing = true;
    const result = await this.queue.add(task);
    this.executing = false;
    this.lastExecuted = timestamp.now();

    return result;
  }
}

const queue = new ExecutionQueue();

export default queue;
