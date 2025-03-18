import express from 'express';
const app = express();
const port = 3000; // Avoid 5173 (Vite's default dev port)

// Middleware to parse JSON (useful for APIs)
app.use(express.json());

// Basic route
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Express!' });
});

// Start the server
app.listen(port, () => {
  console.log(`Express server running at http://localhost:${port}/`);
});