const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const quizRouter = require('./Routes/Quiz'); 

app.use('/api/quiz', quizRouter);
app.use(cors());
app.use(express.json()); 
mongoose
  .connect("mongodb+srv://User_27:Vandita27@cluster0.uqmgnkh.mongodb.net/?appName=Cluster0")
  .then(() => {
    console.log("✅ Connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    // You might want to exit the process if the DB connection fails
    // process.exit(1);
  });

// --- Route Definitions (Load the route files once) ---
// Note: We are using require() directly to avoid creating unnecessary variables
app.use("/api/Auth", require("./Routes/Auth"));
app.use("/api/scores", require("./Routes/Score"));
app.use("/api/modules", require("./Routes/Modules"));
app.use("/api/quizzes", require("./Routes/Quiz"));
app.use("/api/Test", require("./Routes/Test"));

// --- Default/Test Route ---
app.get("/", (req, res) => {
  res.send("Backend is Running ✅ and MongoDB is Connected!");
});

// --- Server Start ---
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server Started on Port ${PORT}`);
});