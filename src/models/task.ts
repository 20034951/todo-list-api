import { v4 as uuidv4 } from 'uuid';

export class Task {
    id: string;
    title: string;
    dueDate: string;
    completed: boolean;

    constructor(title: string, dueDate: string){
        this.id = uuidv4();
        this.title = title;
        this.dueDate = dueDate;
        this.completed = false;
    }
}