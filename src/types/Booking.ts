export interface CreateBooking {
  userName: string;
  userId: string;
  courtId: string;
  startTime: string;
  endTime: string;
}

export interface Booking extends CreateBooking {
  _id: string;
}