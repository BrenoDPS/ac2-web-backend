import { Request, Response } from 'express';
import { Todo } from '../models/Todo';

export const getTodos = async (req: Request, res: Response) => {
    try {
        const todos = await Todo.find({ owner: req.user.id });
        res.json(todos);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const createTodo = async (req: Request, res: Response) => {
    const { title, description } = req.body;
    try {
        const todo = new Todo({
            title,
            description,
            owner: req.user.id
        });
        await todo.save();
        res.status(201).json(todo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateTodo = async (req: Request, res: Response) => {
    const { title, description, completed } = req.body;
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        if (todo.owner.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Access denied' });
        }

        todo.title = title || todo.title;
        todo.description = description || todo.description;
        todo.completed = typeof completed === 'boolean' ? completed : todo.completed;

        await todo.save();
        res.json(todo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteTodo = async (req: Request, res: Response) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        if (todo.owner.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Access denied' });
        }

        await todo.remove();
        res.json({ message: 'Todo deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUnassignedTodos = async (req: Request, res: Response) => {
    try {
        const todos = await Todo.find({ owner: null });
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const assignTodo = async (req: Request, res: Response) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        todo.owner = req.body.ownerId;
        await todo.save();

        res.json(todo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
