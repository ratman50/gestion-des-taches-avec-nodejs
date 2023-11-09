import express from "express";
import passport from "../middleware/auth-middleware";
import *  as AuthController from "../controllers/AuthController";
const router=express.Router();

router.post("/login", passport.authenticate("local",{
    session:false
}),AuthController.login);

export default router;