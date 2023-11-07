import express from 'express';
import UserController from '../controllers/UserController';
import { validateFormUser } from '../middleware/validateCreateUser';

const router= express.Router();

router.post('/', validateFormUser,UserController.createUser);
router.get('/', UserController.readAll);
router.get('/:id', UserController.readUser);
router.patch('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

export=router;