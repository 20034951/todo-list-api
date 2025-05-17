import { v4 as uuidv4 } from 'uuid';

export class Goal {
    id: string;
    title: string;
    dueDate: string;
    progress: number;

    constructor(title: string, dueDate: string){
        this.id = uuidv4();
        this.title = title;
        this.dueDate = dueDate;
        this.progress = 0;
    }
}