import { Schema, model } from 'mongoose';

const taskSchema = new Schema({
    title: {type: String, required: true },
    dueDate: {type: String, required: true },
    completed: {type: Boolean, default: false },
}, { timestamps: true });

export const TaskModel = model('tasks', taskSchema);