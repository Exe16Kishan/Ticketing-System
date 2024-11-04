"use server"

import { prisma } from "@/app/db"
import { formSchema } from "@/lib/zod"
import { z } from "zod"

export const createEvent = async (data: z.infer<typeof formSchema>) => {
    console.log(data)
    if (!data) {
        return null
    }
    const { title, description, location, date, time, seats, organizerId } = data;
    try {
        const newEvent = await prisma.event.create({
            data: {
                title,
                description,
                location,
                date,
                time,

                seat: seats,
                organizerId

            }
        })
        return { success: true, message: 'Event created successfully!' }
    } catch (error) {
        return { success: false }

    }
}