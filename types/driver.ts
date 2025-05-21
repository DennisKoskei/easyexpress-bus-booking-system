// @/types/user.ts
// import { Bus } from "@/types/bus";

export interface Driver {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  passwordHash?: string;
  avatarUrl?: string;
  licenseNo: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  age: number;
  experience: number;
  createdAt: string;
  // bus?: Bus;
}

export type PublicUser = Pick<
  Driver,
  "firstName" | "lastName" | "email" | "avatarUrl"
>;

export type EditableDriverKeys = keyof Omit<
  Driver,
  "id" | "passwordHash" | "createdAt"
>;

// For form creation (no ID, no createdAt yet, optional passwordHash)
export interface NewDriver {
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  licenseNo: string;
  gender?: "MALE" | "FEMALE" | "OTHER";
  age?: number;
  experience: number;
  createdAt: string;
  // bus?: Bus;
  passwordHash?: string;
}
