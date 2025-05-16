import bcrypt from 'bcrypt';
import express, { Request, Response } from 'express';
import { User } from '../models/User.ts';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  console.log('Regist route hit');

  try {
    const { name, phone, password } = req.body;

    const existingUser = await User.findOne({ phone });

    if (existingUser) {
      res.status(409).json({ error: 'Номер телефону вже зареєстрований' });

      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      phone,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: 'Користувач успішно зареєструвався' });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Сталася помилка' });
    }
  }
});

router.get('/', async (_: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
});

router.patch('/reset-password', async (req: Request, res: Response) => {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      res
        .status(400)
        .json({ error: 'Номер телефону та новий пароль обовʼязкові' });

      return;
    }

    const user = await User.findOne({ phone });

    if (!user) {
      res
        .status(404)
        .json({ error: 'Користувача з таким номером не знайдено' });

      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Пароль успішно оновлено' });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Сталася помилка під час зміни пароля' });
    }
  }
});

export default router;
