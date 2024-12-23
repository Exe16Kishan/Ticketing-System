import Image from "next/image";
import { SlCalender } from "react-icons/sl";
import { CiClock1, CiHeart } from "react-icons/ci";
import Link from "next/link";
import { Event } from "@/types";
interface CardProps {
  eventDetail: Event;
}

function Card({eventDetail}:CardProps) {
  return (
    <div className="bg-white shadow-lg rounded-lg w-72 m-4 overflow-hidden">
      <div className="relative">
        <Image
          src="/event.jpg"
          alt="event"
          width={400}
          height={200}
          className="rounded-t-md object-cover"
        />
        <CiHeart className="absolute p-1 text-2xl top-3 right-3 z-10 bg-white rounded-full" />
      </div>
      {/* info */}
      <div className="p-3">
        <h3 className="font-semibold text-lg mb-2">
          {eventDetail.title}
        </h3>
        <div className="flex items-center text-gray-600 text-sm gap-1 mb-3">
          <p>Organized by</p>
          <p className="font-medium">{eventDetail.organizer?.name || "unknown organizer"}</p>
        </div>
        <div className="text-sm text-gray-600 mb-4">
          {/* date and address */}
          <div className="flex items-center gap-2 mb-2">
            <SlCalender className="text-xl" />
            <p>{eventDetail.date.toDateString()}</p>
            <p className="ml-auto">-{eventDetail.location}</p>
          </div>
          {/* time */}
          <div className="flex items-center gap-2">
            <CiClock1 className="text-xl" />
            <p>{eventDetail.time}</p>
          </div>
        </div>
        {/* price and buying */}
        <div className="flex justify-between items-center px-1 my-3">
          <div className="flex flex-col">
            <p className="text-gray-500 text-sm">Start from</p>
            <p className="text-lg font-semibold">Rs {eventDetail.price}</p>
          </div>
          <Link href={`/events/${eventDetail.id}`}>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              Buy Ticket
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Card;
