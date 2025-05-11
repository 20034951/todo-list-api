const { v4 : uuidv4 } = require('uuid');

class Goal{
    constructor(title, dueDate){
        this.id = uuidv4();
        this.title = title;
        this.dueDate = dueDate;
        this.progress = 0;
    }
}

module.exports = Goal;