// @/types/bus.ts

import { Driver } from "./driver";
import { Route } from "./route";
import { Seat } from "./seat";

export interface Bus {
  id: string;
  plateNumber: string;
  totalSeats: number;
  busAvatar?: string | null;
  driverId: string;
  driver: Driver;
  routes: Route[];
  seats: Seat[];
}

export interface NewBus {
  id: string;
  plateNumber: string;
  totalSeats: number;
  busAvatar?: string;
  driverId: string;
}
