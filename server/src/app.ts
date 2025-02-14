import express, { Request, Response } from "express";  
import  userRoutes from "./routes/userRoutes";
import { securityRoutes} from "./routes/securityRoutes";
import testConnection from "./config/dbClient";
import  postRoutes  from "./routes/postRoutes";
import  claimRoutes  from "./routes/claimRoutes";
import  commentRoutes  from "./routes/commentRoutes";

const app = express(); 


app.use(express.json());
app.use("/users", userRoutes)
app.use("/api/auth", securityRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/claims', claimRoutes);
app.use('/api/comments', commentRoutes);

app.listen(5000, () => {
  testConnection()
  console.log("Server is running on port 5000");
});
