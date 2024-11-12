import React from "react";
import { CiClock1, CiHeart } from "react-icons/ci";
import Image from "next/image";

interface Caste {
  i:{performName: string;
    occupation: string;
    image: string | null;
  }
}
const EventCasteCard = ({i}:Caste) => {
  return (
    <div className="h-48 w-48">
      <div className="flex flex-col">
        <div className="relative">
          <Image
            src="/dp.png"
            alt="event"
            width={400}
            height={200}
            className="w-36 h-36 mx-auto rounded-full"
          />
          <CiHeart className="absolute p-1 text-2xl top-3 right-3 z-10 bg-white rounded-full" />
        </div>{" "}
        {/* info */}
        <div className="p-3 text-center">
          <div className="mb-2">
            <span className="font-semibold text-lg">{i.performName}</span>
            <p className="font-xs text-gray-500">{i.occupation}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCasteCard;
