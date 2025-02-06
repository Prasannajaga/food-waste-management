import express, { Request, Response } from "express";
const app = express(); 





app.get("/", (req, res) => {
  
  
  res.send("Hello, the API is running");
});

app.listen(5000, () => {
  console.log("Server is running on port 3000");
});
