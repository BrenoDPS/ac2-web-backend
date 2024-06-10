import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import authRoutes from './rotas/authRoutes';
import userRoutes from './rotas/userRoutes';
import todoRoutes from './rotas/todoRoutes';

dotenv.config();

// Conectar ao MongoDB
connectDB();

const app = express();

// Middleware para parsing do JSON
app.use(express.json());

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/todos', todoRoutes);

export default app;
