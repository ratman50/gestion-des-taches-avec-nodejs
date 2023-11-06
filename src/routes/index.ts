import express from "express";
import userRoute from "./UserRouter";
import tacheRoute from "./TacheRouter";
const router=express.Router();

router.use("/users",userRoute);
router.use("/taches", tacheRoute )
export=router;