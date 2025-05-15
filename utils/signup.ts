// utils/signup.ts
"use server";

import { prisma } from "@utils/prisma";
import bcrypt from "bcrypt";

export async function signup(prevState: any, formData: FormData) {
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  const errors: Record<string, string> = {};

  if (!firstName) errors.firstName = "First name is required";
  if (!lastName) errors.lastName = "Last name is required";
  if (!email) errors.email = "Email is required";
  if (!phone) errors.phone = "Phone number is required";
  if (!password) errors.password = "Password is required";
  if (password !== confirmPassword)
    errors.confirmPassword = "Passwords do not match";

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) errors.email = "Email already in use";

  if (Object.keys(errors).length > 0) return { errors };

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      phone,
      passwordHash: hashedPassword,
    },
  });

  // Return credentials for auto login
  return { email, password };
}
