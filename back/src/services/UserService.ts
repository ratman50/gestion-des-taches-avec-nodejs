import mongoose from 'mongoose';
import User, { IUser, IUserModel } from '../models/User';

export const create=async (user:IUser) =>{
    const newUser= new User({
        _id:new mongoose.Types.ObjectId,
        ...user
    });

    const res=await newUser.save();
    return res;

}
export const findOne=async (id:string) => {
    return await User.findById(id).select('-password');
}
export const findByEmail=async (email:string)=>{
    return await User.findOne({email});
}
export const findMany=async () => {
    return await User.find().select('-password');
}
export const update=async (id:string, userUpdate:IUser) => {
    const user = await findOne(id); 
    if(user){
        user.set(userUpdate);
        return await user.save();
    } else
    return null;
}
export const deleteUser=async (id:string)=>{
    return await User.findByIdAndDelete(id).select("-password");
}