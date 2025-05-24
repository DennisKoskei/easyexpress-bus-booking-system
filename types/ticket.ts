// @/types/ticket.ts

export interface Ticket {
  id: string;
  passengerId: string;
  bookingSeatId: string;
  routeId: string;
  seatNumber: number;
  busPlate: string;
  price: number;
  qrCode: string;
}
