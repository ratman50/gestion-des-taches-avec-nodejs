import express from 'express';
import UserController from '../controllers/UserController';

const router= express.Router();

router.post('/',UserController.createUser);
router.get('/', UserController.readAll);
router.get('/:id', UserController.readUser);
router.patch('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

export=router;