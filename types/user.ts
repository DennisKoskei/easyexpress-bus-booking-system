// /types/user.ts

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: "MALE" | "FEMALE";
  age: number;
  role: "PASSENGER" | "ADMIN";
  createdAt: string;
}

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
  passwordHash?: string;
  gender?: "MALE" | "FEMALE";
  age?: number;
  role?: "ADMIN" | "PASSENGER";
}
