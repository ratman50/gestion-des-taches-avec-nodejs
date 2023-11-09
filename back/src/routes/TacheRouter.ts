import express from 'express';
import TacheController from '../controllers/TacheController';

const router= express.Router();

router.post('/',TacheController.createTache);
router.get('/', TacheController.readAll);
router.get('/:id', TacheController.readTache);
router.patch('/:id', TacheController.updateTache);
router.delete('/:id', TacheController.deleteTache);

export=router;