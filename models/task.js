const { v4 : uuidv4 } = require('uuid');

class Task {
    constructor(title, dueDate) {
        this.id = uuidv4();
        this.title = title;
        this.dueDate = dueDate;
        this.completed = false;
    }
}

module.exports = Task;