import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/todo';

export const connectMongoDB = async() => {
    try {
        await mongoose.connect(mongoURI);
        console.log('MongoDB connected');
    } catch (error){
        console.error('MongoDB connection error: ', error);
        process.exit(1);
    }

}