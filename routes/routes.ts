import { Router } from 'express';
import UserController from '../controllers/UserController';

const router = Router();

router.get('/users', UserController.get);
router.post('/users', UserController.post);
router.put('/users/:id', UserController.put);
router.delete('/users/:id', UserController.delete);

export default router;