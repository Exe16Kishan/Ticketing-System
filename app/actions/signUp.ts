"use server";

import bcrypt from "bcryptjs"; // Assuming password hashing
import { prisma } from "../db";


export async function signUp(fullName: string, email: string, password: string) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name: fullName,
        email,
        password: hashedPassword,
      },
    });

    return { success: true, newUser };
  } catch (error) {
    console.error("Sign-up error:", error);
  }
}





