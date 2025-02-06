import { Router } from "express";
import { BaseController } from "../config/baseController";
import User from "../models/Users";


export const userRoutes = Router();
const baseController = new BaseController();


userRoutes.get('/:id' , async (req , res) => {
   const userId = req.params.id; 
   const d  = await baseController.get(User , userId);
   console.log("response data " , d);
   res.send(d);
});

userRoutes.get('/findAll' , async (req , res) => {
   const d  = await baseController.getAll(User);
   console.log("response data " , d);
   res.send(d);
});