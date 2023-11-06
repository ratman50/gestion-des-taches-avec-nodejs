import { NextFunction, Request, Response } from 'express';
import * as TacheService from  '../services/TacheService';

const createTache = async (req:Request, res: Response, next:NextFunction)=>{
   const tache= await TacheService.create(req.body);
   return res.status(201).json({tache})
}
const readTache=async (req:Request, res:Response) => {
    const tacheId=req.params.id;
    const tache=  await TacheService.findOne(tacheId);
    return tache ? res.status(200).json(tache) : res.status(404).json(
);
}
const readAll = async (req: Request, res: Response) => {
    const tache = await TacheService.findMany();
    return  res.status(200).json(tache);
};
const updateTache = async (req: Request, res: Response) => { 
    const tacheId = req.params.id;
    const tache = await TacheService.update(tacheId, req.body);
    return tache ? res.status(200).json(tache) : res.status(404).json('not found');
};
const deleteTache = async (req: Request, res: Response) => {
    const tacheId = req.params.id;
    return TacheService.deleteTache(tacheId)
        .then((tache) => (tache ? res.status(201).json({ tache, message: 'Deleted' }) : res.status
(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
}
export default {createTache, readAll, updateTache, deleteTache, readTache};