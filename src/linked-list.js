const Node = require('./node');

class LinkedList {
    constructor() {
        this._head = null;
        this._tail = null;
        this.nodes = [];
        this.length = 0;
    }

    append(data) {
        if(this._head === null) {
            let node = new Node(data);
            this.nodes.push(node);
            this._head = node;
            this._tail = node;
            this.length ++;
        }
        else {
            let node = new Node(data, this._head, this._tail);
            this._tail.next = node;
            node.prev = this._tail;
            this._tail = node;
            this.nodes.push(node);
            this.length ++;
        }
        return this;
    }

    head() {
        return this.nodes[0] ? this._head.data : null;
    }

    tail() {
        return this.nodes[0] ? this._tail.data : null;
    }

    at(index) {
        return this.nodes[index].data;
    }

    insertAt(index, data) {
        let node = new Node(data, this._head, this._tail);
        if(this.nodes[index]) {
            node.next = this.nodes[index];
            this.nodes[index].prev = node;
            this.nodes[index - 1].next = node;
            node.prev = this.nodes[index - 1];
            this.nodes.splice(index, 0, node);
            this.length ++;
        }
        return this;
    }

    isEmpty() {
        return this.length === 0;
    }

    clear() {
        this._head = null;
        this._tail = null;
        this.nodes = [];
        this.length = 0;
        return this;
    }

    deleteAt(index) {
        if(index === 0) {
            if(this.nodes.length === 1)
            {
                this._head = null;
                this._tail = null;
                this.nodes.pop();
                this.length --;
                return this;

            }
            this._head = this.nodes[index + 1];
            this._head.prev = null;
            this.nodes.shift();
            this.length --;
            return this;
        }
        this.nodes[index - 1].next = this.nodes[index + 1];
        this.nodes[index + 1].prev = this.nodes[index - 1];
        this.nodes.splice(index, 1);
        this.length --;
        return this;
    }

    reverse() {
        let temp = this._head;
        this._head = this._tail;
        this._tail = temp;
        this.nodes.reverse();
        return this;
    }

    indexOf(data) {
        for (let node of this.nodes)
            if(node.data === data)
                return this.nodes.indexOf(node);
            return -1;
    }

}

module.exports = LinkedList;

