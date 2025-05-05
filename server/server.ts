import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.ts';
import bookingRoutes from './routes/bookingRoutes.ts';
import locationRoutes from './routes/locationRoutes.ts';
import loginRoutes from './routes/loginRoutes.ts';
import cors from 'cors';
// import validateTelegramData from './telegram-auth/validateTelegramData.ts';
import fs from 'fs';
import https from 'https';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// HTTPS credentials
const httpsOptions = {
  key: fs.readFileSync('localhost-key.pem'),
  cert: fs.readFileSync('localhost.pem'),
};

// Middleware to parse JSON (useful for APIs)
app.use(express.json());

// app.use(
//   cors({
//     origin: ['http://localhost:5173'], // Add your front-end URL here
//     credentials: true,
//   })
// );

const corsOptions = {
  origin: ['https://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log('Connected to MongoDB');
    https.createServer(httpsOptions, app).listen(PORT, () => {
      console.log(`🚀 HTTPS Server running at https://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Default Route
app.get('/', (_, res) => {
  res.send('API is running...');
});

app.get('/api/hello', (_, res) => {
  res.json({ message: 'Hello from Express!' });
});

// User route
app.use('/api/users', userRoutes);

// Booking route
app.use('/api/bookings', bookingRoutes);

// Locations route
app.use('/api/locations', locationRoutes);

// Login route
app.use('/api/login', loginRoutes);

/// TELEGRAM ///

// app.get('/login', (req: any, res: any) => {
//   console.log('Received query:', req.query); // Повні дані від Telegram
//   if (validateTelegramData(req.query as any)) {
//     const { first_name, last_name, username } = req.query as any;
//     console.log('Validated user:', { first_name, last_name, username });
//     res.json({
//       message: `Вітаємо, ${first_name} ${last_name || ''} (@${username || 'немає'})!`,
//       user: { first_name, last_name, username },
//     });
//   } else {
//     console.log('Validation failed for:', req.query);
//     res.status(401).json({ error: 'Помилка авторизації' });
//   }
// });
