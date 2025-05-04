import 'dotenv/config'
import express from "express";
import  userRoutes from "./routes/userRoutes"; 
import { securityRoutes} from "./routes/securityRoutes"; 
import testConnection from "./config/dbClient"; 
import  postRoutes  from "./routes/postRoutes"; 
import  claimRoutes  from "./routes/claimRoutes"; 
import  commentRoutes  from "./routes/commentRoutes"; 
import  likeRoutes from "./routes/likeRouters"; 
import cors from "cors";

// Create express app
const app = express(); 

// app.use(requireAuth()) 

// Use express json middleware to parse json bodies
app.use(express.json()); 
app.use(cors());
 
app.use("/api/users", userRoutes); 
app.use("/api/auth", securityRoutes); 
app.use('/api/posts', postRoutes); 
app.use('/api/claims', claimRoutes); 
app.use('/api/post/likes', likeRoutes); 
app.use('/api/post/comments', commentRoutes);

 
app.get("/check", (req,res) =>{ 
  res.send("SUCESS");
})
// Start server on port 5000 and log message to console
app.listen(5000, () => {
  testConnection()
  console.log("Server is running on port 5000"); 
});

export default app;
