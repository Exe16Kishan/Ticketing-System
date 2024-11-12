"use client";
import { createBooking } from "@/app/actions/bookTicket";
import { eventDetail } from "@/app/actions/events";
import EventCasteCard from "@/components/event-caste";
import EventQuidelines from "@/components/EventQuidelines";
import FrequentlyAskedQuestion from "@/components/FrequentlyAskedQuestion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Event } from "@/types";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function EventDetail({ params }: any) {
  const session = useSession();
  const router = useRouter()
  const [eventData, setEventData] = useState<Event | null>(null);
  const [ticketId, setTicketId] = useState<string | null>(null)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await eventDetail(params.eventId);
        if (data?.success) {
          setEventData(data.eventDetail);
        }
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };

    fetchData();
  }, [params.eventId]);

  if (!eventData) return <div>Loading...</div>;

  const handleSubmit = async () => {
    const data = {
      eventId: eventData?.id,
      userId: session.data?.user?.id,
      price: eventData?.price,
      title: eventData.title,
      location: eventData.location,
    };

    const result = await createBooking(data);
    if (result?.success) {
      setTicketId(result.ticketId)
    }
  };
  
  return (
    <div className="bg-gray-200">
      <div
        className="relative bg-cover bg-center bg-no-repeat w-full h-[66vh] mb-10"
        style={{ backgroundImage: `url('/event.jpg')` }}
        >
        {/* Overlay for better readability */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Components centered */}
        <div className="relative z-10 flex justify-center items-center h-full max-w-7xl mx-auto px-4 gap-5">
          {/* Left part - 1/3 width */}
          <div className="flex flex-col justify-center items-start space-y-4">
            <Image
              className="border-4 rounded-xl"
              src={"/event.jpg"}
              height={540}
              width={540}
              alt="QR Code or Event Image"
              />
          </div>

          {/* Right part - 2/3 width */}
          <div className="flex flex-col justify-center items-start space-y-4">
            <h1 className="text-white text-4xl font-bold">
              {eventData?.title}
            </h1>
            <p className="text-white">{eventData?.description}</p>
            <button
              onClick={handleSubmit}
              className="mt-8 bg-blue-500 text-white px-4 py-2 rounded"
              >
              Buy Tickets
            </button>
            {ticketId && (
              <Button
              variant="outline"
              onClick={() => router.push(`/ticket/${ticketId}`)}
                className="mt-4"
              >
                View Ticket
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="flex justify-center ">
        <div className="w-full max-w-5xl bg-gray-100 p-3 rounded-t-lg">
          <h1 className="text-3xl font-bold mb-2 text-gray-800">
            {eventData?.title}
          </h1>
          <div className="flex items-center gap-2 mb-4">
            <p className="text-gray-600">by</p>
            <p className="text-blue-700 font-semibold">
              {eventData?.organizer.name}
            </p>
          </div>
          <p className="text-gray-700 mb-6">{eventData?.detailDescription}</p>

          <Separator />
          {/* Event Guidelines */}
          <div className="mb-6">
            <EventQuidelines />
          </div>
          <Separator />

          {/* Event castes */}
          <div className="my-10 h-fit">
            <h1 className="font-bold text-2xl mx-4 my-4">Caste</h1>
            <div className="grid grid-cols-5 gap-4 mx-4">
              {eventData?.caste.map((item, index) => (
                <div key={index}>
                  <EventCasteCard i={item} />
                </div>
              ))}
            </div>
          </div>
          <Separator />

          {/* Frequently Asked Questions */}
          <div className="mb-12">
            <FrequentlyAskedQuestion />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetail;
