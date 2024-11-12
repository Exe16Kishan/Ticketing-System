"use server"

import { prisma } from "@/app/db"

export const eventDetail = async (id:string) => {
      const eventDetail = await prisma.event.findUnique({
            where:{
              id
            },
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
                  image:true
                }
              }
            }
          })

      return {success : true , eventDetail}
}


