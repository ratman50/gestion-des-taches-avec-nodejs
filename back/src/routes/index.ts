import express from "express";
import userRoute from "./UserRouter";
import tacheRoute from "./TacheRouter";
import authRoute from "./AuthRouter";
const router=express.Router();

router.use("/users",userRoute);
router.use("/taches", tacheRoute );
router.use("/auth", authRoute );


export=router;