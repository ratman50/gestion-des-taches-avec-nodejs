import express from 'express';
import UserController from '../controllers/UserController';
import * as UserMiddleware from '../middleware/user-middleware';

const router= express.Router();

router.post('/', UserMiddleware.validateCreateUser,UserController.createUser);
router.get('/',UserController.readAll);
router.get('/:id', UserController.readUser);
router.patch('/:id', UserMiddleware.validateUpdateUser,UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

export=router;