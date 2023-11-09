import { Request, Response } from "express";
import * as AuthService from "../services/AuthService";
import { IUser, IUserModel } from "models/User";

export const login=async (req:Request, res:Response)=>{
    const info= AuthService.generateToken(req.body);
    const {name,dob, email, _id}=req.user as IUserModel;
    
    return res.status(201).json({
        token:info,
        user:{name,dob,email,_id}
    });
}
export const logout=async (req:Request, res:Response)=>{
    
}