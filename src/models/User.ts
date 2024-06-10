import { Schema, model, Document } from 'mongoose';

interface IUser extends Document {
    username: string;
    password: string;
    role: 'Engenheiro de FE' | 'Engenheiro de BE' | 'Analista de dados' | 'Líder Técnico';
}

const UserSchema = new Schema<IUser>({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { 
        type: String, 
        enum: ['Engenheiro de FE', 'Engenheiro de BE', 'Analista de dados', 'Líder Técnico'], 
        default: 'Engenheiro de FE' 
    }
});

export const User = model<IUser>('User', UserSchema);
