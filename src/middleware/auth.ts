import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();

export function authMiddleware(req: Request, res: Response, next: NextFunction){
    const authHeader = req.headers['authorization'];
    if(authHeader === process.env.API_KEY){
        next();
    } else {
        res.status(401).json({ error: 'Unauthorized: Invalid API key'});
    }
}