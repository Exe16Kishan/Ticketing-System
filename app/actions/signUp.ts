"use server";

import bcrypt from "bcrypt"; // Assuming password hashing
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


// signin verification

export async function signVerification(email: string, password: string) {
  try {
    // search for the user
    const userExist = await prisma.user.findUnique({
      where: {
        email
      }
    })
    // if user not found
    if (!userExist || !userExist.password) {
      return { success: false }
    }
    // compare the hashed pass 
    const hashedPasswordValidate = bcrypt.compare(password, userExist?.password);
    // if password not validates
    if (!hashedPasswordValidate) {
      return { success: false }
    }
    return { success: true , userExist}

  } catch (error) {
    console.error("Sign-up error:", error);
  }
}
