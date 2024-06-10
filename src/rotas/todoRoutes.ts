import { Router } from 'express';
import {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    getUnassignedTodos,
    assignTodo
} from '../controllers/todoController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.use(authMiddleware);

router.get('/', getTodos);
router.post('/', createTodo);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);
router.get('/unassigned', getUnassignedTodos);
router.put('/assign/:id', assignTodo);

export default router;
