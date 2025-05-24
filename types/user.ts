// @/types/user.ts

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  gender?: string;
  age?: number;
  role: string;
  avatarUrl?: string;
  createdAt: string;
  totalBookings?: number;
  totalTickets?: number;
}

export type PublicUser = Pick<
  User,
  "firstName" | "lastName" | "email" | "avatarUrl"
>;

export type EditableUserKeys = keyof Omit<
  User,
  "id" | "passwordHash" | "createdAt"
>;

// For form creation (no ID, no createdAt yet, optional passwordHash)
export interface NewUser {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  avatarUrl: string;
  passwordHash?: string;
  gender?: "MALE" | "FEMALE" | "OTHER";
  age?: number;
  role?: "ADMIN" | "PASSENGER";
}
