"use server";

import { prisma } from "@/app/db";

export const dataFetch = async () => {
    try {
        const events = await prisma.event.findMany({
            include:{
                organizer:{
                    select:{
                        name:true
                    }
                },
                caste:{
                    select:{
                        performName:true,
                        occupation:true,
                        eventId:true,
                        image:true
                    }
                }
            }
        });
        console.log("Fetched events:", events);
        return events;
    } catch (error) {
        console.error("Error fetching events:", error);
        return [];
    }
};


