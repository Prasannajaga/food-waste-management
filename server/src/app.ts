import express from "express";
import userRoutes from "./routes/userRoutes";
import { securityRoutes } from "./routes/securityRoutes";
import testConnection from "./config/dbClient";
import postRoutes from "./routes/postRoutes";
import claimRoutes from "./routes/claimRoutes";
import commentRoutes from "./routes/commentRoutes";

const app = express();

app.use(express.json());
// Routes for User
app.use("/users", userRoutes);
// Routes for Authentication
app.use("/api/auth", securityRoutes);
// Routes for Posts
app.use('/api/posts', postRoutes);
// Routes for Claims
app.use('/api/claims', claimRoutes);
// Routes for Comments
app.use('/api/comments', commentRoutes);

app.listen(5000, () => {
  testConnection();
  console.log("Server is running on port 5000");
});

