import { Request, Response } from 'express';
import { User } from '../models/User';

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params['id']);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    const { username, role } = req.body;
    try {
        const user = await User.findById(req.params['id']);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.username = username || user.username;
        user.role = role || user.role;

        await user.save();
        res.json({ message: 'User updated successfully' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params['id']);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await user.remove();
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUserCountByRole = async (req: Request, res: Response) => {
    try {
        const roles = ['Engenheiro de FE', 'Engenheiro de BE', 'Analista de dados', 'Líder Técnico'];
        const counts = await Promise.all(roles.map(role => User.countDocuments({ role })));

        const result: { [key: string]: number } = roles.reduce((acc, role, index) => {
            acc[role] = counts[index];
            return acc;
        }, {});

        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
