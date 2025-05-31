import { Router } from 'express';
import { getAllUsers, getUserById, postUser, updateUser, deleteUser } from '../controllers/user.controller.js';
export const userRouter = Router();

userRouter.get('/',   getAllUsers);
userRouter.get('/:id', getUserById);
userRouter.post('/',  postUser);
userRouter.put('/:id', updateUser);
userRouter.delete('/:id',  deleteUser);
