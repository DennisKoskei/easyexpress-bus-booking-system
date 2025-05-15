"use server";

import { prisma } from "@utils/prisma";
import { Role } from "@prisma/client";
import {
  FormState,
  LoginFormSchema,
  SignupFormSchema,
} from "@utils/definitions";
import { createSession, deleteSession } from "@utils/02-stateless-session";
import bcrypt from "bcrypt";

export async function signup(
  state: FormState,
  formData: FormData,
): Promise<FormState> {
  const validated = SignupFormSchema.safeParse({
    firstName: String(formData.get("firstName") || ""),
    lastName: String(formData.get("lastName") || ""),
    phone: String(formData.get("phone") || ""),
    gender: String(formData.get("gender") || ""),
    age: String(formData.get("age") || ""),
    email: String(formData.get("email") || ""),
    password: String(formData.get("password") || ""),
    confirmPassword: String(formData.get("confirmPassword") || ""),
  });

  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
    };
  }

  const { firstName, lastName, phone, gender, age, email, password } =
    validated.data;

  const userExists = await prisma.user.findUnique({ where: { email } });

  if (userExists) {
    return {
      message: "Email already exists. Please use a different email or log in.",
    };
  }

  try {
    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        phone,
        gender,
        age,
        email,
        passwordHash,
        role: Role.PASSENGER,
      },
    });

    await createSession(user.id.toString());

    return { success: true };
  } catch (error) {
    console.error("Signup Error:", error);
    return { message: "Something went wrong during account creation." };
  }
}

export async function login(
  state: FormState,
  formData: FormData,
): Promise<FormState> {
  const validated = LoginFormSchema.safeParse({
    email: String(formData.get("email") || ""),
    password: String(formData.get("password") || ""),
  });

  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validated.data;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !user.passwordHash) {
    return { message: "Invalid login credentials." };
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);

  if (!isMatch) {
    return { message: "Invalid login credentials." };
  }

  await createSession(user.id.toString());

  return { success: true };
}

export async function logout() {
  await deleteSession();
}
