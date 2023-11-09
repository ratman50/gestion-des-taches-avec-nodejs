import { Request, Response } from "express";
import  passport  from "passport";
import {Strategy as LocalStrategy} from "passport-local";
import User, { IUserModel } from "../models/User";
import Logging from "../library/Loggin";

passport.use(
    new LocalStrategy({
        usernameField:"email",
        passwordField:"password",
    },
       async function verify(email, password, done){
        try {
            const user= await User.findOne({email});
            if(!user)
                return done(null, false, {message:"password or email not correct"});
            const isMatch= await user.isValidPassword(password  );
            if(isMatch)
                return done(null, user);
            else
                return done(null, false, {message:"password or email not correct"})
        } catch (error) {
            done(error);
        }
       }
    )
);
passport.serializeUser(function(user:IUserModel, done){
    done(null, user.id);
})
passport.deserializeUser(function (id:string, done) {
    User.findById(id, function(err:Error, user:IUserModel){
        done(err, user);
    })
})
export default passport;