// @/types/booking.ts

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
  paymentId?: string;
  createdAt: string;
}

export interface BookingSummary {
  id: string;
  passengerName: string;
  passengerPhone: string;
  seatNumber: number;
  amount: number;
}

export type BookingData = {
  id: string;
  route: {
    departure: string;
    destination: string;
    date: string;
    time: string;
  };
  passengerName: string;
  passengerPhone: string;
  passengerGender: string;
  paymentId?: string;
  createdAt: string;
  ticket?: {
    seatNumber: number;
    busPlate: string;
    price: number;
    qrCode: string;
  };
};
