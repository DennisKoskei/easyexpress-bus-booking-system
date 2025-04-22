// @/types/seat.ts

export type SeatStatus = "AVAILABLE" | "BOOKED" | "RESERVED";

export interface Seat {
  id: string;
  busId: string;
  seatNumber: number;
  status: SeatStatus;
  isBooked: boolean; //from the booking page
}
