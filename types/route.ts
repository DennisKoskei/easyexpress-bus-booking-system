// @/types/route.ts

export interface Route {
  id: string;
  departure: string;
  destination: string;
  date: Date; // ISO string : was initially // date: string;
  time: string;
  amount: number;
  busId: string;
}
