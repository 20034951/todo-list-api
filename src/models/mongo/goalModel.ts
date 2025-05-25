import { Schema, model } from 'mongoose';

const goalSchema = new Schema({
    title: { type: String, required: true },
    dueDate: { type: String, required: true },
    progress: { type: Number, default: 0 }
}, { timestamps: true });

export const GoalModel = model('goals', goalSchema);