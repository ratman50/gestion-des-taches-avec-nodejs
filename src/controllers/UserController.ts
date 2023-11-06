import { NextFunction, Request, Response } from 'express';
import * as UserService from  '../services/UserService';

const createUser = async (req:Request, res: Response, next:NextFunction)=>{
   const user= await UserService.create(req.body);
   return res.status(201).json({user})
}
const readUser=async (req:Request, res:Response) => {
    const userId=req.params.id;
    const user=  await UserService.findOne(userId);
    return user ? res.status(200).json(user) : res.status(404).json(
);
}
const readAll = async (req: Request, res: Response) => {
    const user = await UserService.findMany();
    return  res.status(200).json(user);
};
const updateUser = async (req: Request, res: Response) => { 
    const userId = req.params.id;
    const user = await UserService.update(userId, req.body);
    return user ? res.status(200).json(user) : res.status(404).json('not found');
};
const deleteUser = async (req: Request, res: Response) => {
    const userId = req.params.id;
    return UserService.deleteUser(userId)
        .then((user) => (user ? res.status(201).json({ user, message: 'Deleted' }) : res.status
(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
}
export default {createUser, readAll, updateUser, deleteUser, readUser};