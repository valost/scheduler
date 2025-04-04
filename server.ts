import express from 'express';
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from './routes/userRoutes';
import bookingRoutes from './routes/bookingRoutes';
import locationRoutes from './routes/locationRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
import cors from 'cors';
import validateTelegramData from './server/telegram-auth/validateTelegramData';

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
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Express!' });
});


// User route
app.use('/api/users', userRoutes);

// Booking route
app.use('/aip/bookings', bookingRoutes);

// Locations route
app.use('/api/locations', locationRoutes);





// Start the server
// app.listen(PORT, () => {
//   console.log(`Express server running at http://localhost:${PORT}/`);
// });

// app.use(
//   cors({
//     origin: ['https://oauth.telegram.org', 'http://localhost:3000'], // Додай свій домен
//     credentials: true,
//   }),
// );

app.get('/login', (req: any, res: any) => {
  console.log('Received query:', req.query); // Повні дані від Telegram
  if (validateTelegramData(req.query as any)) {
    const { first_name, last_name, username } = req.query as any;
    console.log('Validated user:', { first_name, last_name, username });
    res.json({
      message: `Вітаємо, ${first_name} ${last_name || ''} (@${username || 'немає'})!`,
      user: { first_name, last_name, username },
    });
  } else {
    console.log('Validation failed for:', req.query);
    res.status(401).json({ error: 'Помилка авторизації' });
  }
});
