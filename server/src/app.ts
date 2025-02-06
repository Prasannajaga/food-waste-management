import express, { Request, Response } from "express";  
import { userRoutes } from "./routes/userRoutes";
const app = express(); 



app.use("/user", userRoutes)
 

app.listen(5000, () => {
  console.log("Server is running on port 3000");
});
