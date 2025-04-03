import express from 'express';
import cors from 'cors';
import validateTelegramData from './server/telegram-auth/validateTelegramData.ts';

const app = express();
const port = 3000; // Avoid 5173 (Vite's default dev port)

// Middleware to parse JSON (useful for APIs)
app.use(express.json());

app.use(
  cors({
    origin: ['https://oauth.telegram.org', 'http://localhost:3000'], // Додай свій домен
    credentials: true,
  }),
);

// Basic route
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Express!' });
});

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

// Start the server
app.listen(port, () => {
  console.log(`Express server running at http://localhost:${port}/`);
});
