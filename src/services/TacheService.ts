import mongoose from 'mongoose';
import Tache, { ITache, ITacheModel } from '../models/Tache';

export const create=async (variableName:ITache):Promise<ITacheModel> =>{
    const newTache= new Tache({
        _id:new mongoose.Types.ObjectId,
        ...variableName
    });

    return  newTache.save();

}
export const findOne=async (id:string) => {
    return await Tache.findById(id);
}
export const findMany=async () => {
    return await Tache.find();
}
export const update=async (id:string, variableNameUpdate:ITache) => {
    const variableName = await findOne(id); 
    if(variableName){
        variableName.set(variableNameUpdate);
        return await variableName.save();
    } else
    return null;
}
export const deleteTache=async (id:string)=>{
    return await Tache.findByIdAndDelete(id);
}