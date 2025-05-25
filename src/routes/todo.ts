import { Router, Request, Response } from 'express';
import { store } from '../data/store'; 
import { Task } from '../models/task';
import { Goal } from '../models/goal';
import { 
    getTasks,
    getGoals,
    getTaskById,
    getGoalById,
    addTask,
    addGoal,
    removeTask,
    removeGoal,
    updateTask,
    updateGoal

} from '../services/todo';

const router = Router();

//GET
router.get('/getTasks', async (_req: Request, res: Response) => {
    const tasks = await getTasks();
    res.status(200).json(tasks);
});

router.get('/getTask/:id', async (req: Request, res: Response) => {
    const {id} = req.params;
    const task = await getTaskById(id);

    if(!task){
        return res.status(400).json({error: 'Task not found'});
    }
    return res.status(200).json(task);
});

router.get('/getGoals', async (_req: Request, res: Response) => {
    const goals = await getGoals();
    res.status(200).json(goals);
});

router.get('/getGoal/:id', async (req: Request, res: Response) => {
    const {id} = req.params;
    const goal = await getGoalById(id);

    if(!goal){
        return res.status(400).json({error: 'Goal not found'});
    }
    return res.status(200).json(goal);
});

//POST
router.post('/addTask', async (req: Request, res: Response) => {
    const {title, dueDate} = req.body;
    if(!title || !dueDate){
        return res.status(400).json({error: 'Missing task values'});
    }
    const savedTask = await addTask({title, dueDate} as any);
    return res.status(201).json(savedTask);
});

router.post('/addGoal', async (req: Request, res: Response) => {
    const {title, dueDate} = req.body;
    if(!title || !dueDate){
        return res.status(400).json({error: 'Missing goal values'});
    }
    const savedGoal = await addGoal({title, dueDate} as any);
    return res.status(201).json(savedGoal);
});

//DELETE
router.delete('/removeTask', async (req, res) => {
    const {id} = req.body;
    const removed = await removeTask(id);
    if(!removed) {
        return res.status(404).json({ error: 'Task not found' })
    }
    
    return res.status(200).json({message: 'Task removed', id});
});

router.delete('/removeGoal', async (req, res) => {
    const {id} = req.body;
    const removed = await removeGoal(id);
    if(!removed){
        return res.status(404).json({ error: 'Goal not found' })
    }
    return res.status(200).json({message: 'Goal removed', id});
});

//UPDATE
router.put('/updateTask', async (req, res) => {
    const {id, title, dueDate, completed} = req.body;
    
    const updated = await updateTask({id, title, dueDate, completed} as any);
    if(!updated){
        return res.status(404).json({ error: 'Task not found' })
    }
    
    return res.status(200).json({message: 'Task updated'});
});

router.put('/updateGoal', async (req, res) => {
    const {id, title, dueDate, progress} = req.body;
    
    const updated = await updateGoal({id, title, dueDate, progress} as any)
    if(!updated){
        return res.status(404).json({ error: 'Goal not found' })
    }

    return res.status(200).json({message: 'Goal updated'});
});


export default router;