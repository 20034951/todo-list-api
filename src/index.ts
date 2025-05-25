import express from 'express';
import dotenv from 'dotenv';
import todoRoutes from './routes/todo';
import { authMiddleware } from './middleware/auth';
import { connectMongoDB } from './database/mongo';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(authMiddleware);
app.use('/', todoRoutes);

if(process.env.STORAGE === 'mongo'){
    connectMongoDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running with MongoDB on port :${PORT}`);
        })
    })
    .catch((error) => {
        console.error('Failed to connect to MongoDB: ', error);
        process.exit(1);
    });
}else{
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

