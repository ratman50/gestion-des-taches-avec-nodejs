import { IUser } from "models/User";
import { z } from "zod";
import { NextFunction, Request, Response } from "express";
import Logging from "../library/Loggin";
import { findByEmail } from "../services/UserService";
const FormUser=z.object({
    name:z.string({
        required_error:" name is required",
        invalid_type_error:"name must be a string"
    }).min(1).max(50),
    dob:z.string(),
    sexe:z.enum(["MALE", "FEMELLE"]),
    password:z.string().min(1).max(40),
    password_confirmed:z.string(),
    email:z.string().email()
})
.refine((data)=> data.password===data.password_confirmed,{
    message:"Oops! password doesn't match"
})
;
const validateUser=(inputs:unknown)=>{
    const isValidate= FormUser.parse(inputs);
    return isValidate;
} 

export const  validateFormUser=(req:Request, res:Response, next: NextFunction)=>{
    Logging.info("validating");
    const user= validateUser(req.body);
    if (!user) 
        res.status(404).send({ error: user });
    if(findByEmail(user.email))
    {
        res.status(400).send({message:"user already exits"});
    }
    next();
  }
