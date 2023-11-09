import { IUserModel } from "models/User";
import e, { NextFunction, Request, Response } from "express";
import Logging from "../library/Loggin";
import { findByEmail } from "../services/UserService";
import { ZodError, ZodType, ZodTypeDef, z } from "zod";
import { FormCreateUser, FormCreateUserType, FormUpdateUser } from "../validators/user-validator";
import { validate } from "./";

export const validateCreateUser = async (req: Request, res: Response, next: NextFunction) => {
     Logging.info("validating");
     let validateUser: FormCreateUserType;
     try {
          //logic of validation
          validateUser = await validate(req.body, FormCreateUser);
          if (await findByEmail(validateUser.email)) {
               throw new Error("user already exists");
          }
     } catch (error) {
          let valueError;
          if(error instanceof ZodError)
            valueError=error.issues;
          else 
            valueError=[{message:error.message}];
          res.status(400).send({
               success: false,
               error:valueError,
          });

          Logging.error(error);
          return;
     }

     next();
};

export const validateUpdateUser=async (req:Request, res:Response, next:NextFunction) => {
      Logging.info("validating");
     let validateUser: FormCreateUserType;
     try {
          //logic of validation
          validateUser = await validate(req.body, FormUpdateUser);
          if (await findByEmail(validateUser.email)) {
               throw new Error("user already exists");
          }
     } catch (error) {
          let valueError;
          if(error instanceof ZodError)
            valueError=error.issues;
          else 
            valueError=[{message:error.message}];
          res.status(400).send({
               success: false,
               error:valueError,
          });

          Logging.error(error);
          return;
     }

     next();
}