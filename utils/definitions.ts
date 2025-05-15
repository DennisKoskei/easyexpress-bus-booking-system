import { z } from "zod";

export const SignupFormSchema = z
  .object({
    firstName: z
      .string()
      .min(2, { message: "First name must be at least 2 characters long." })
      .trim(),
    lastName: z
      .string()
      .min(2, { message: "Last name must be at least 2 characters long." })
      .trim(),
    phone: z
      .string()
      .min(10, { message: "Phone number must be at least 10 digits." })
      .trim(),
    gender: z.enum(["MALE", "FEMALE", "OTHER"]), // Based on your Gender enum
    age: z
      .string()
      .regex(/^\d+$/, { message: "Age must be a number." }) // If you're taking it as a string from the form
      .transform((val) => parseInt(val, 10)), // convert to number
    email: z.string().email({ message: "Please enter a valid email." }).trim(),
    password: z
      .string()
      .min(8, { message: "Be at least 8 characters long" })
      .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
      .regex(/[0-9]/, { message: "Contain at least one number." })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Contain at least one special character.",
      })
      .trim(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export const LoginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(1, { message: "Password field must not be empty." }),
});

export type FormState =
  | {
    errors?: {
      firstName?: string[];
      lastName?: string[];
      phone?: string[];
      email?: string[];
      password?: string[];
      gender?: string[];
      age?: string[];
      confirmPassword?: string[];
    };
    success?: boolean;
    message?: string;
  }
  | undefined;

export type SessionPayload = {
  userId: string | number;
  expiresAt: Date;
};
