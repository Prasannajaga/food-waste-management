import express, { Request, Response } from "express";  
import { userRoutes} from "./routes/userRoutes";
import { securityRoutes} from "./routes/securityRoutes";

const app = express(); 


app.use(express.json());
app.use("/user", userRoutes)
app.use("/api/auth", securityRoutes);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
