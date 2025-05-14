import express, { Request, Response } from 'express';
import { Booking } from '../models/Booking.ts';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const newBooking = new Booking(req.body);
    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
});

router.get('/', async (_: Request, res: Response) => {
  try {
    const bookings = await Booking.find().sort({ startTime: 1 });

    res.status(200).json(bookings);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
});

router.get('/:userId', async (req: Request, res: Response) => {
  const { userId } = req.params;
  const currentTime = new Date();

  try {
    const bookings = await Booking.find({
      userId: userId,
      startTime: { $gte: currentTime },
    }).sort({ startTime: 1 });

    res.status(200).json(bookings);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedBooking = await Booking.findByIdAndDelete(id);

    if (!deletedBooking) {
      res.status(404).json({ message: 'Booking not found' });
      return;
    }

    res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
});

router.get('/:courtId/:date', async (req: Request, res: Response) => {
  const { courtId, date } = req.params;

  try {
    const bookings = await Booking.find({
      courtId,
      date,
    }).sort({ startTime: 1 });

    if (bookings.length === 0) {
      res.status(200).json({
        message: 'No bookings found for the given courtId and date',
        bookings: [],
      });
    } else {
      res.status(200).json(bookings);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
});

export default router;
