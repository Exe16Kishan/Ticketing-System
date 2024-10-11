import Image from "next/image";
import { SlCalender } from "react-icons/sl";
import { CiClock1 } from "react-icons/ci";

function Card() {
  return (
    <div className="bg-white shadow-lg rounded-lg w-80 m-4 overflow-hidden">
      <div>
        <Image
          src="/event.jpg"
          alt="event"
          width={400}
          height={200}
          className="rounded-t-md object-cover"
        />
      </div>
      {/* info */}
      <div className="p-3">
        <h3 className="font-semibold text-lg mb-2">Music Concert & Dance Finale</h3>
        <div className="flex items-center text-gray-600 text-sm gap-1 mb-3">
          <p>Organized by</p>
          <p className="font-medium">The World Organizers</p>
        </div>
        <div className="text-sm text-gray-600 mb-4">
          {/* date and address */}
          <div className="flex items-center gap-2 mb-2">
            <SlCalender className="text-xl" />
            <p>11 June 2023</p>
            <p className="ml-auto">-129 Swan Avenue, Boston, LA</p>
          </div>
          {/* time */}
          <div className="flex items-center gap-2">
            <CiClock1 className="text-xl" />
            <p>05:00 PM</p>
          </div>
        </div>
        {/* price and buying */}
        <div className="flex justify-between items-center px-1 my-3">
          <div className="flex flex-col">
            <p className="text-gray-500 text-sm">Start from</p>
            <p className="text-lg font-semibold">$18.55</p>
          </div>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Buy Ticket
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
