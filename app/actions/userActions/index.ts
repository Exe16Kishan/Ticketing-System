"use server"

import { prisma } from "@/app/db"
import { formSchema } from "@/lib/zod"
import { z } from "zod"

export const createEvent = async (data: z.infer<typeof formSchema>) => {
    console.log(data)
    if (!data) {
        return null
    }
    const { title, description, location, date, time,performers, seats, type,organizerId,price ,detailDescription} = data;
    try {
        const newEvent = await prisma.event.create({
            data: {
                title,
                description,
                detailDescription,
                location,
                date,
                time,
                type,
                seat: seats,
                organizerId,
                price,
                caste:{
                    createMany:{
                        data: performers,
                    }
                }

            }
        })
        console.log(newEvent)
        return { success: true, message: 'Event created successfully!'}
    } catch (error) {
        return { success: false ,message :'event not created'}

    }
}