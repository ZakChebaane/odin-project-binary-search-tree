export class Queue {
    constructor() {
        this.queue = [];
    }
    enqueue(data) {
        this.queue.push(data);
    }
    dequeue() {
        this.queue.shift();
    }
}