"use server"
import { prisma } from "@/app/db";
import QRCode from "qrcode";

async function generateQRCode(data: object): Promise<string> {
  const stringData = JSON.stringify(data);
  try {
    const qrCodeImageUrl = await QRCode.toDataURL(stringData);
    return qrCodeImageUrl;
  } catch (error) {
    console.error("Error generating QR code:", error);
    throw error;
  }
}

interface TicketBooking {
  userId : string | undefined;
  eventId :string ;
  price : number,
  title : string,
  location : string
}

export const createBooking = async (bookingData:TicketBooking) => {
    // console.log(bookingData)
    const {userId,eventId,price,title,location}=bookingData
    const booking = await prisma.ticket.create({
      data:{
       price,
       userId,
       eventId,  
      }
    })
console.log("booking  "+booking)
    
    return { success: true, message: "Booking successful!", ticketId:booking.id };
    
  };
  


  export const ticketdata = async (id:string) => {
    const ticket = await prisma.ticket.findUnique({
      where:{
        id
      },
      select:{
        event:{
          select:{
            title:true,
            location:true,
            time:true,
            date:true,
            price:true
          }
        },
        user:{
          select:{
            name:true,

          }
        },

      }
    })
      const qrData = {
    bookingId: id,
    eventTitle: ticket?.event.title ,
    date:ticket?.event.date,
    location: ticket?.event.location,
  };
  const qrCodeUrl = await generateQRCode(qrData);
    return {success:true, ticket,qrCodeUrl}
  }