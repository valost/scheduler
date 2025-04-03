import express from 'express';
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON (useful for APIs)
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Default Route
app.get("/", (req, res) => {
  res.send("API is running...");
});


// Basic route
// app.get('/api/hello', (req, res) => {
//   res.json({ message: 'Hello from Express!' });
// });

// Start the server
// app.listen(PORT, () => {
//   console.log(`Express server running at http://localhost:${PORT}/`);
// });

