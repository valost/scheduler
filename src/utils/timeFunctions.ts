import dayjs, { Dayjs } from 'dayjs';
import { TimeView } from '@mui/x-date-pickers';
import { Booking } from '../types/Booking';

export const shouldDisableStartTime = (value: Dayjs, view: TimeView): boolean => {
  if (view === 'minutes') {
    return value.minute() % 30 !== 0; // Disable non-30 minute intervals
  }

  const hour = value.hour();
  return hour < 5 || hour >= 23; // Disable hours outside of the allowed range (5:00 AM to 10:30 PM)
};

export const shouldDisableEndTime = (
  value: Dayjs,
  view: TimeView,
  startTime: Dayjs | null
): boolean => {
  if (!startTime) return true; // Disable end time if start time is not set

  const selected = value;
  const diff = selected.diff(startTime, 'minute');

  if (view === 'minutes') {
    return value.minute() % 30 !== 0; // Disable non-30 minute intervals
  }

  if (diff < 30) {
    return true; // End time must be at least 30 minutes later than start time
  }

  // Ensure the end time is not before the start time
  if (selected.isBefore(startTime)) {
    return true;
  }

  return false;
};

// Generate all possible 30-minute time slots for a day
const generateTimeSlots = (selectedDay: string): Dayjs[] => {
  const times: Dayjs[] = [];
  const startHour = 5;
  const endHour = 23; // End of day (but last valid session starts at 22:30)

  let currentTime = dayjs(selectedDay).set('hour', startHour).set('minute', 0).set('second', 0);

  while (currentTime.hour() < endHour || (currentTime.hour() === endHour && currentTime.minute() === 0)) {
    if (currentTime.add(30, 'minute').hour() <= endHour) {
      times.push(currentTime);
    }
    currentTime = currentTime.add(30, 'minute');
  }

  return times;
};

// Check if a time slot overlaps with any existing bookings
const isTimeBooked = (time: Dayjs, bookings: Booking[]): boolean => {
  return bookings.some((booking) => {
    const bookingStart = dayjs(booking.startTime);
    const bookingEnd = dayjs(booking.endTime);
    return time.isSame(bookingStart) || time.isSame(bookingEnd) || (time.isAfter(bookingStart) && time.isBefore(bookingEnd));
  });
};

export const getAvailableTimes = (
  bookings: Booking[],
  selectedDay: string
): { startTimes: Dayjs[]; endTimes: Dayjs[] } => {
  const allTimes = generateTimeSlots(selectedDay); // 30-min steps: 5:00 → 23:00
  const today = dayjs();

  const isToday = dayjs(selectedDay).isSame(today, 'day');

  const startTimes = allTimes.filter((start) => {
    if (isToday && start.isBefore(today)) return false;

    const end = start.add(30, 'minute');

    // Check both start and 30-min later end slot are free
    return (
      !isTimeBooked(start, bookings) &&
      !isTimeBooked(end, bookings)
    );
  });

  const endTimes = allTimes.filter((end) => {
    if (isToday && end.isBefore(today)) return false;
    return !isTimeBooked(end, bookings);
  });

  return { startTimes, endTimes };
};

