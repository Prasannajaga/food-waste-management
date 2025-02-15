import express, { Request, Response } from "express";  
// Import user routes
import  userRoutes from "./routes/userRoutes";
// Import security routes
import { securityRoutes} from "./routes/securityRoutes";
// Import function to test database connection
import testConnection from "./config/dbClient";
// Import post routes
import  postRoutes  from "./routes/postRoutes";
// Import claim routes
import  claimRoutes  from "./routes/claimRoutes";
// Import comment routes
import  commentRoutes  from "./routes/commentRoutes";

// Create express app
const app = express(); 

// Use express json middleware to parse json bodies
app.use(express.json());

// Use user routes for /users endpoint
app.use("/users", userRoutes)
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

