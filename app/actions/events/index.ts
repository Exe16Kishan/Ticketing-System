"use server"

import { prisma } from "@/app/db"

export const Events = async() => {
    
      const data = await prisma.event.findMany()
      return data 
    
}