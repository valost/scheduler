import dayjs from 'dayjs';
import { Booking, BookingServer, CreateBooking } from '../types/Booking';

export const convertBookingToISO = (booking: CreateBooking): CreateBooking => {
  return {
    ...booking,
    startTime: dayjs(booking.startTime).toISOString(),
    endTime: dayjs(booking.endTime).toISOString(),
  };
};

export const convertBookingToDayjs = (booking: BookingServer): Booking => {
  return {
    ...booking,
    startTime: dayjs(booking.startTime),
    endTime: dayjs(booking.endTime),
  };
};
