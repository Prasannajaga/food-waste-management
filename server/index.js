import express from "express";
import sequelize from "./models/index.js"; // Import sequelize setup (adjust path if needed)

const app = express();

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected!");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

app.get("/", (req, res) => {
  res.send("Hello, the API is running");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
