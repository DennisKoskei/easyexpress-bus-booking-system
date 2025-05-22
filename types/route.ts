// @/types/route.ts
// Importing Bus interface from bus.ts
import { Bus } from "./bus";

export interface Route {
  id: string;
  departure: string;
  destination: string;
  date: Date; // ISO string : was initially // date: string;
  time: string;
  amount: number;
  busId: string;
  bus?: Bus | null; // Optional bus property
}

export interface SearchData {
  departure: string;
  destination: string;
  date: string;
}

// EditableRouteKeys type to define which keys are editable
export type EditableRouteKeys = keyof Omit<Route, "id">;
