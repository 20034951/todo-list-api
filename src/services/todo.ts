import { store } from '../data/store'; 

import { GoalModel } from '../models/mongo/goalModel';
import { TaskModel } from '../models/mongo/taskModel';
import dotenv from 'dotenv';

dotenv.config();
const useMongo = process.env.STORAGE === 'mongo';

let todoIndex = (id: string, data: any[]): number => {
    return data.findIndex((element) => element.id === id);
}


//GET TASKS
export async function getTasks(){
    if (useMongo) {
        return await TaskModel.find();
    }
    return store.tasks; 
}

export async function getTaskById(id: any){
    if (useMongo) {
        return await TaskModel.findOne({ _id : id });
    }
    return store.tasks.find(item => item.id === id);
}


//GET GOALS
export async function getGoals(){
    if (useMongo) {
        return await GoalModel.find();
    }
    return store.goals; 
}

export async function getGoalById(id: any){
    if (useMongo) {
        return await GoalModel.findOne({ _id : id });
    }
    return store.goals.find(item => item.id === id);
}


//POST TASK
export async function addTask(item: any){
    if(useMongo){
        await TaskModel.create(item);
    }else{
        store.tasks.push(item);
    }
    return item;
}

//POST GOAL
export async function addGoal(item: any){
    if(useMongo){
        await GoalModel.create(item);
    }else{
        store.goals.push(item);
    }
    return item;
}

//DELETE TASK
export async function removeTask(id: any){
    if (useMongo) {
        return await TaskModel.findByIdAndDelete({ _id : id });
    }
    const index = todoIndex(id, store.tasks);
    if(index !== -1){
        store.tasks = store.tasks.filter(item => item.id !== id)
        return id;
    }
    return null;    
}

//DELETE GOAL
export async function removeGoal(id: any){
    if (useMongo) {
        return await GoalModel.findByIdAndDelete({ _id : id });
    }
    const index = todoIndex(id, store.goals);
    if(index !== -1){
        store.tasks = store.tasks.filter(item => item.id !== id)
        return id;
    }
    return null;
}

//UPDATE TASK
export async function updateTask(updated: any){
    if (useMongo) {
        const { id, title, dueDate, completed } = updated;
        return await TaskModel.findOneAndUpdate(
            { _id: id },
            { title, dueDate, completed },
            { new: true }
        );
    }

    const index = todoIndex(updated.id, store.tasks);
    if(index !== -1){
        store.tasks[index] = updated;
        return updated;
    }
    return null;
}

//UPDATE GOAL
export async function updateGoal(updated: any){
    if(useMongo){
        const { id, title, dueDate, progress } = updated;
        return await GoalModel.findOneAndUpdate(
            { _id: id },
            { title, dueDate, progress },
            { new: true }
        );
    }

    const index = todoIndex(updated.id, store.goals);
    if(index !== -1){
        store.goals[index] = updated;
        return updated;
    }
    return null;
}

