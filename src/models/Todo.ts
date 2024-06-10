import { Schema, model, Document, Types } from 'mongoose';

interface ITodo extends Document {
    title: string;
    description?: string;
    completed: boolean;
    owner: Types.ObjectId | null;
}

const TodoSchema = new Schema<ITodo>({
    title: { type: String, required: true },
    description: String,
    completed: { type: Boolean, default: false },
    owner: { type: Types.ObjectId, ref: 'User', default: null }
});

export const Todo = model<ITodo>('Todo', TodoSchema);
