import express, { Request, Response } from "express";   
import  userRoutes from "./routes/userRoutes"; 
import { securityRoutes} from "./routes/securityRoutes"; 
import testConnection from "./config/dbClient"; 
import  postRoutes  from "./routes/postRoutes"; 
import  claimRoutes  from "./routes/claimRoutes"; 
import  commentRoutes  from "./routes/commentRoutes";

// Create express app
const app = express(); 

// Use express json middleware to parse json bodies
app.use(express.json()); 

// Use user routes for /users endpoint
app.use("/api/users", userRoutes)
// Use security routes for /api/auth endpoint
app.use("/api/auth", securityRoutes);
// Use post routes for /api/posts endpoint
app.use('/api/posts', postRoutes);
// Use claim routes for /api/claims endpoint
app.use('/api/claims', claimRoutes);
// Use comment routes for /api/comments endpoint
app.use('/api/comments', commentRoutes);

// Start server on port 5000 and log message to console
app.listen(5000, () => {
  testConnection()
  console.log("Server is running on port 5000");
});

