"use server"

import { prisma } from "@/app/db";
import { Caste } from "@/types";

export async function addPerformers(data: {performers: Caste[] }) {
    
    try {
         await prisma.caste.createMany({
            data:data.performers,
            skipDuplicates:false
        })
             return { success: true }
            } catch (error) {
        return { success: false }
        
    }
    }