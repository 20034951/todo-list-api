import { Router, Request, Response } from 'express';
import { store } from '../data/store'; 
import { Task } from '../models/task';
import { Goal } from '../models/goal';

const router = Router();

//GET
router.get('/getTasks', (_req: Request, res: Response) => {
    res.json(store.tasks);
});

router.get('/getTask/:id', (req: Request, res: Response) => {
    const {id} = req.params;
    const task = store.tasks.find(task => task.id === id);

    if(!task){
        return res.status(400).json({error: 'Task not found'});
    }
    return res.status(200).json(task);
});

router.get('/getGoals', (_req: Request, res: Response) => {
    res.json(store.goals);
});

router.get('/getGoal/:id', (req: Request, res: Response) => {
    const {id} = req.params;
    const goal = store.goals.find(goal => goal.id === id);

    if(!goal){
        return res.status(400).json({error: 'Goal not found'});
    }
    return res.status(200).json(goal);
});

//POST
router.post('/addTask', (req: Request, res: Response) => {
    const {title, dueDate} = req.body;
    if(!title || !dueDate){
        return res.status(400).json({error: 'Missing task values'});
    }
    const task = new Task(title, dueDate);
    store.tasks.push(task);
    return res.status(201).json(task);
});

router.post('/addGoal', (req: Request, res: Response) => {
    const {title, dueDate} = req.body;
    if(!title || !dueDate){
        return res.status(400).json({error: 'Missing goal values'});
    }
    const goal = new Goal(title, dueDate);
    store.goals.push(goal);
    return res.status(201).json(goal);
});

//DELETE
router.delete('/removeTask', (req, res) => {
    const {id} = req.body;
    store.tasks = store.tasks.filter(task => task.id !== id);
    return res.status(200).json({message: 'Task removed', id});
});

router.delete('/removeGoal', (req, res) => {
    const {id} = req.body;
    store.goals = store.goals.filter(goal => goal.id !== id);
    return res.status(200).json({message: 'Goal removed', id});
});

//UPDATE
router.put('/updateTask', (req, res) => {
    const {id, title, dueDate, completed} = req.body;
    const task = store.tasks.find(task => task.id === id);
    if(!task) return res.status(404).json({error: 'Task not found'});

    task.title = (title !== undefined) ? title : 'No Title Defined';
    task.dueDate = (dueDate !== undefined) ? dueDate : Date.now();
    task.completed = (completed !== undefined) ? completed : false;

    return res.status(200).json({message: 'Task updated'});
});

router.put('/updateGoal', (req, res) => {
    const {id, title, dueDate, progress} = req.body;
    const goal = store.goals.find(goal => goal.id === id);
    if(!goal) return res.status(404).json({error: 'Goal not found'});

    goal.title = (title !== undefined) ? title : 'No Title Defined';
    goal.dueDate = (dueDate !== undefined) ? dueDate : Date.now();
    goal.progress = (progress !== undefined) ? progress : 0;

    return res.status(200).json({message: 'Goal updated'});
});


export default router;