import bcrypt from 'bcrypt';
import express from 'express';
import { User } from '../models/User.ts';

const router = express.Router();

router.post('/', async (req, res: any) => {
  console.log('Regist route hit')
  
  try {
    const { name, phone, password } = req.body;

    const existingUser = await User.findOne({ phone });

    if (existingUser) {
      return res.status(409).json({ error: 'Номер телефону вже зареєстрований' });
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

router.get('/', async (_, res) => {
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

export default router;
