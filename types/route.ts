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

export interface SearchData {
  departure: string;
  destination: string;
  date: string;
}

// EditableRouteKeys type to define which keys are editable
export type EditableRouteKeys = keyof Omit<Route, "id">;
