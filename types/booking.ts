// /types/booking.ts

export type BookingStatus = "PENDING" | "CONFIRMED" | "CANCELLED";
export type Gender = "MALE" | "FEMALE" | "OTHER";

export interface Booking {
  id: string;
  userId: string;
  routeId: string;
  seatId: string;
  passengerName: string;
  passengerPhone: string;
  passengerGender: Gender;
  status: BookingStatus;
  createdAt: string;
}
