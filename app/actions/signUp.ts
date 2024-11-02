"use server";

import bcrypt from "bcrypt"; // Assuming password hashing
import { prisma } from "../db";
import { signIn } from "@/auth";
import { redirect } from "next/navigation";

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





