import { Router } from "express";
import { BaseController } from "../config/baseController";
import User from "../models/Users";
import bcrypt from "bcrypt"; 

export const securityRoutes = Router();
const baseController = new BaseController();
// export default securityRoutes;

securityRoutes.post('/signup', async (req: any, res: any) => {
  try {
    const {  email, phone, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).send({ message: "Name, email, and password are required." });
    }

    const userExist = await User.findOne({ where: { email } });
    if (userExist) {
      return res.status(409).send({ message: "User with that email already exists." });
    }

    const saltRounds = 10; 
    const namePrefix = email.split("@")[0] + "#01";

    const newUser = await baseController.post(User, { 
      name: namePrefix, 
      email:email, 
      phone: phone ?? null, 
      password_hash: password,  
      created_at: new Date(),      
      updated_at: new Date()
    });

    return res.status(201).send({ 
      message: "User created successfully", 
      user: {
        user_id: newUser.get("user_id"),
        name: newUser.get("name"),
        email: newUser.get("email"),
        phone: newUser.get("phone")
      }
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).send({ message: "Server error" });
  }
});

securityRoutes.post('/login', async (req: any, res: any) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({ message: "Email and password are required." });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).send({ message: "Invalid email or password." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.get("password_hash") as string);
    if (!isPasswordValid) {
      return res.status(400).send({ message: "Invalid email or password." });
    }

    return res.status(200).send({
      message: "Login successful",
      user: {
        user_id: user.get("user_id"),
        name: user.get("name"),
        email: user.get("email"),
        phone: user.get("phone")
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).send({ message: "Server error" });
  }
});