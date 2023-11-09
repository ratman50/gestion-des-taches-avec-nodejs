import { NextFunction, Request, Response } from "express";
import Logging from "../library/Loggin";


export const formatResponseMiddleware = (req:Request, res: Response, next:NextFunction) => {
  
    res.format({
      "application/json":function(){
        return {"data":"data"}
      }
    });
    Logging.info("format data")
    next();
};
